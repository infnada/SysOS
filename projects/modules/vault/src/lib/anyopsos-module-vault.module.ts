import {getLogger, Logger} from 'log4js';
import {readFile} from 'fs-extra';
import nodeVault, {client} from 'node-vault';

import {AOO_ANYOPSOS_TYPE, AOO_VAULT_HOST, AOO_VAULT_PORT, AOO_VAULT_API_VERSION, AOO_VAULT_SECRET_SHARES, AOO_VAULT_SECRET_THRESHOLD} from '@anyopsos/module-sys-constants';

import {VaultState} from './types/vault-state';


const logger: Logger = getLogger('vault');

const options = {
  apiVersion: AOO_VAULT_API_VERSION,
  endpoint: `https://${AOO_VAULT_HOST}:${AOO_VAULT_PORT}`,
};

const vaultClient: client = nodeVault(options);

/**
 * This module will only work inside 'anyopsos-auth' Pod since it uses the Kubernetes Pod Service Account to login with Vault
 * Everything in this class can be called without authentication. Make sure no sensitive data is returned
 */
export class AnyOpsOSVaultModule {

  constructor() {
  }

  /**
   * Returns the main instance of the Vault Client (already authenticated)
   */
  getVaultClient(): client {
    logger.trace(`[Module Vault] -> getVaultClient`);

    return vaultClient;
  }

  /**
   * Returns a list of created users
   */
  async getUsersList(): Promise<string[]> {
    logger.trace(`[Module Vault] -> getUsersList`);

    return vaultClient.list('/auth/userpass/users').then(users =>  users.data.keys).catch(() => []);
  }

  /**
   * Initialisation and configuration of Vault
   * This functions are called by non-authenticated users, since when the users execute it the vault is not initialized, unsealed or even configured
   * -----
   * Initialize -> Unseal -> Enable auth (user:password & Kubernetes) -> Enable secrets for Workspaces
   */

  /**
   * Returns the state of the Vault. This is used to determine if Vault needs to be initialized or unsealed
   * Frontend calls this using the API
   */
  async getVaultState(): Promise<VaultState> {
    logger.trace(`[Module Vault] -> getVaultState`);

    const vaultStatus = await vaultClient.status().catch((e) => {
      logger.fatal(`[Module Vault] -> Vault Error. Unable to contact Vault -> ${e}`);
    });

    return {
      initialized: vaultStatus.initialized,
      sealed: vaultStatus.sealed,
      users: !vaultStatus.sealed ? (await this.getUsersList()).length : 0
    }
  }

  /**
   * Initializes the Vault. This step is done once on initial anyOpsOS setup
   * Users call this using the API
   */
  async initializeVault(): Promise<{ keys: string[]; keys_base64: string[]; root_token: string; }> {
    logger.trace(`[Module Vault] -> initializeVault`);

    const vaultStatus: VaultState = await this.getVaultState();
    if (vaultStatus.initialized) throw new Error('already_initialized');

    const initResult: { keys: string[]; keys_base64: string[]; root_token: string; } = await vaultClient.init({
      secret_shares: parseInt(AOO_VAULT_SECRET_SHARES, 10),
      secret_threshold: parseInt(AOO_VAULT_SECRET_THRESHOLD, 10)
    }).catch(e => {
      logger.error(`[Module Vault] -> initializeVault -> ${e}`);
    });

    // Unseal the Vault
    let unsealResult;
    for (const key of initResult.keys) {
      unsealResult = await this.unsealVault(key);
      if (!unsealResult.sealed) break;
    }

    // A Token is required to enable authentication methods
    vaultClient.token = initResult.root_token;

    // Enable kv2 secrets
    await AnyOpsOSVaultModule.enableKv2Secrets();

    // Enable user:password auth
    await AnyOpsOSVaultModule.enableUserPasswordAuth();

    // Enable Kubernetes auth
    await this.enableKubernetesAuth();

    // Return Vault Seal keys and Root token
    return initResult;
  }

  /**
   * Each time the Vault Pod is restarted, the Users, must unseal the Vault in order to become available
   * Users call this using the API
   * TODO: key param needs to be extra sanitized (key length, characters, convert to string, ...)
   */
  async unsealVault(key: string): Promise<{ initialized: boolean; sealed: boolean; }> {
    logger.trace(`[Module Vault] -> unsealVault`);

    const vaultStatus: VaultState = await this.getVaultState();
    if (!vaultStatus.sealed) throw new Error('already_unsealed');

    return vaultClient.unseal({
      secret_shares: 1,
      key: key
    }).catch(e => {
      console.log(e);
    });

  }

  /**
   * Authenticates Auth Pod with Vault. Required to manipulate users, secrets
   */
  async loginVault(): Promise<void> {
    logger.trace(`[Module Vault] -> loginVault`);

    const saToken: string = await readFile('/run/secrets/kubernetes.io/serviceaccount/token', 'base64').then(saBuffer => Buffer.from(saBuffer.toString(), 'base64').toString());

    // Login as k8s Pod
    const loginResult = await vaultClient.kubernetesLogin({ role: AOO_ANYOPSOS_TYPE, jwt: saToken });
    vaultClient.token = loginResult.auth.client_token;

    logger.info(`[Module Vault] -> Pod logged in to Vault successfully`);
  }

  /**
   * anyOpsOS uses this secrets to connect against nodes. All credentials provided by the users are stored using kv2 on their Workspace
   * After {@link initializeVault} we call this method
   */
  private static async enableKv2Secrets(): Promise<void> {
    logger.trace(`[Module Vault] -> enableKv2Secrets`);

    const mountsEnabled: { [key: string]: string; } = await vaultClient.mounts();
    if (mountsEnabled.hasOwnProperty('secret/')) return;

    return vaultClient.mount({
      mount_point: 'secret',
      type: 'generic',
      description: 'Workspaces credentials Kv2 store'
    });
  }

  /**
   * anyOpsOS uses user:password auth to login users at Frontend
   * After {@link initializeVault} we call this method
   */
  private static async enableUserPasswordAuth(): Promise<void> {
    logger.trace(`[Module Vault] -> enableUserPasswordAuth`);

    const authsEnabled: { [key: string]: string; } = await vaultClient.auths();
    if (authsEnabled.hasOwnProperty('userpass/')) return;

    return vaultClient.enableAuth({
      mount_point: 'userpass ',
      type: 'userpass',
      description: 'Auth using username:password',
    });
  }

  /**
   * Configures Vault to enable authentication using Kubernetes Pod ServiceAccount. This allows the Pods to authenticate and perform actions against the Vault
   * Users call this using the API
   */
  private async enableKubernetesAuth(): Promise<void> {
    logger.trace(`[Module Vault] -> enableKubernetesAuth`);

    const authsEnabled: { [key: string]: string; } = await vaultClient.auths();
    if (authsEnabled.hasOwnProperty('kubernetes/')) return;

    await vaultClient.enableAuth({
      mount_point: 'kubernetes',
      type: 'kubernetes',
      description: 'Auth using Kubernetes SA',
    });

    const saToken: string = await readFile('/run/secrets/kubernetes.io/serviceaccount/token', 'base64').then(saBuffer => Buffer.from(saBuffer.toString(), 'base64').toString());
    const k8sca: string = await readFile('/run/secrets/kubernetes.io/serviceaccount/ca.crt', 'base64').then(caBuffer => Buffer.from(caBuffer.toString(), 'base64').toString());

    await vaultClient.write('auth/kubernetes/config', {
      token_reviewer_jwt: saToken,
      kubernetes_host: 'https://kubernetes.default.svc',
      kubernetes_ca_cert: k8sca,
    });

    // Allow access to Workspace secrets
    await vaultClient.addPolicy({
      name: AOO_ANYOPSOS_TYPE,
      policy: `path "secret/workspaces/*" { capabilities = ["create", "update", "read", "delete", "list"] }
      path "auth/userpass/users" { capabilities = ["create", "update", "read", "delete", "list"] }`
    });

    await vaultClient.write(`auth/kubernetes/role/${AOO_ANYOPSOS_TYPE}`, {
      bound_service_account_names: process.env.POD_SA,
      bound_service_account_namespaces: process.env.POD_NAMESPACE,
      policies: AOO_ANYOPSOS_TYPE,
      ttl: '24h',
    });

    // Login as k8s Pod
    await this.loginVault();
  }


}

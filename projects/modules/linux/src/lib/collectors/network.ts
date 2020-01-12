import {SshSessionsModule} from '@anyopsos/module-ssh';

export class NetworkMonitorModule {

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly connectionUuid: string) {
  }

  async getActiveInterfaces(): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'netstat -rn | grep UG | awk \'{print $NF}\'');
    return cmdData.replace(/(\n|\r)+$/, '').split(/\s+/);
  }

  async getBootInterfaces(): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'nmcli --terse --fields DEVICE dev status');
    return cmdData.replace(/(\n|\r)+$/, '').split(/\s+/);
  }

  async getInterfaceBandwidth(iface: string): Promise<{}> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid,
      `R1=\`cat /sys/class/net/${iface}/statistics/rx_bytes\`;
      T1=\`cat /sys/class/net/${iface}/statistics/tx_bytes\`;
      sleep 1;
      R2=\`cat /sys/class/net/${iface}/statistics/rx_bytes\`;
      T2=\`cat /sys/class/net/${iface}/statistics/tx_bytes\`;
      TBPS=\`expr $T2 - $T1\`;
      RBPS=\`expr $R2 - $R1\`;
      TKBPS=\`expr $TBPS / 1024\`;
      RKBPS=\`expr $RBPS / 1024\`;
      echo "$TKBPS $RKBPS"`
    );

    cmdData.replace(/(\n|\r)+$/, '').split(/\s+/);

    const transmit = parseInt(cmdData[0], 10) || 0;
    const received = parseInt(cmdData[1], 10) || 0;

    return {
      transmit,
      received,
      total: transmit + received,
      interface: iface
    };
  }

}

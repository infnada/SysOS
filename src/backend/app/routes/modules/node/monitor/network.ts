import {GlobalsModule} from '../../globals';
import {SshSessionsModule} from '../../../../socket/modules/ssh/ssh-sessions';

export class NetworkMonitorModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  getActiveInterfaces(): Promise<string> {
    return this.GlobalsModule.execAsync('netstat -rn | grep UG | awk \'{print $NF}\'').then((data) => {
      return data.replace(/(\n|\r)+$/, '').split(/\s+/);
    });
  }

  getBootInterfaces(): Promise<string> {
    return this.GlobalsModule.execAsync('nmcli --terse --fields DEVICE dev status').then((data) => {
      return data.replace(/(\n|\r)+$/, '').split(/\s+/);
    });
  }

  getInterfaceBandwidth(iface: string): Promise<{}> {
    return this.GlobalsModule.execAsync(
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
    ).then((data) => {

      data.replace(/(\n|\r)+$/, '').split(/\s+/);

      const transmit = parseInt(data[0], 10) | 0;
      const received = parseInt(data[1], 10) | 0;

      return {
        transmit,
        received,
        total: transmit + received,
        interface: iface
      };

    });
  }

}

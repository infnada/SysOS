export interface HostNetOffloadCapabilities {
  csumOffload?: boolean;
  tcpSegmentation?: boolean;
  zeroCopyXmit?: boolean;
}

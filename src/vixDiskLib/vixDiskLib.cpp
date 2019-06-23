#include <cstdio>

/*
* vixDiskLib(.exe) -mount -host 1.1.1.1 -user administrator@vsphere.local -password pw -thumb 11:22:33:44:55... -vm "moref=vm-111" -mode nbdssl "[NFS01] Template WS2012R2/Template WS2012R2.vmdk"
*
*/

#define _SILENCE_TR1_NAMESPACE_DEPRECATION_WARNING
#define _CRT_SECURE_NO_WARNINGS
#define FOR_MNTAPI

#ifdef _WIN32
#include <windows.h>
#include <tchar.h>
#include <process.h>
#else
#include <dlfcn.h>
#endif

#include <time.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>
#include <vector>
#include <stdexcept>
#include <algorithm>
#include <list>
#include <memory>

#ifdef _MSC_VER
#define USE_CXX11 (_MSC_VER > 1700)
#else
#define USE_CXX11 (__cplusplus > 199711L)
#endif

#ifndef _WIN32
#include <tr1/memory.hpp>
#endif

#include "vixDiskLib.h"
#include "vixMntapi.h"
using std::tr1::shared_ptr;


using std::cin;
using std::cout;
using std::string;
using std::endl;
using std::vector;

#define COMMAND_MOUNT (1 << 0)

#define VIXDISKLIB_VERSION_MAJOR 6
#define VIXDISKLIB_VERSION_MINOR 7

static struct {
	int command;
	char *transportModes;
	vector<string> diskPaths;
	uint32 openFlags;
	Bool isRemote;
	char *host;
	char *userName;
	char *password;
	char *thumbPrint;
	int port;
	int nfcHostPort;
	VixDiskLibConnection connection;
	char *vmxSpec;
	char *libdir;
	int repair;
} appGlobals;

static int ParseArguments(int argc, char* argv[]);
static int BitCount(int number);
static void DoMntApi(VixDiskLibConnection connection, const char* disk, uint32 openFlags);

#define THROW_ERROR(vixError) \
   throw VixDiskLibErrWrapper((vixError), __FILE__, __LINE__)

#define CHECK_AND_THROW_2(vixError, buf)                             \
   do {                                                              \
      if (VIX_FAILED((vixError))) {                                  \
         delete[] buf;                                               \
         throw VixDiskLibErrWrapper((vixError), __FILE__, __LINE__); \
      }                                                              \
   } while (0)

#define CHECK_AND_THROW(vixError) CHECK_AND_THROW_2(vixError, ((int*)0))


/*
*--------------------------------------------------------------------------
*
* LogFunc --
*
*      Callback for VixDiskLib Log messages.
*
* Results:
*      None.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static void
LogFunc(const char *fmt, va_list args)
{
	printf("\nLog: ");
	vprintf(fmt, args);
}


/*
*--------------------------------------------------------------------------
*
* WarnFunc --
*
*      Callback for VixDiskLib Warning messages.
*
* Results:
*      None.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static void
WarnFunc(const char *fmt, va_list args)
{
	printf("\nWarning: ");
	vprintf(fmt, args);
}


/*
*--------------------------------------------------------------------------
*
* PanicFunc --
*
*      Callback for VixDiskLib Panic messages.
*
* Results:
*      None.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static void
PanicFunc(const char *fmt, va_list args)
{
	printf("\nPanic: ");
	vprintf(fmt, args);
	exit(10);
}

typedef void (VixDiskLibGenericLogFunc)(const char *fmt, va_list args);


// Wrapper class for VixDiskLib disk objects.

class VixDiskLibErrWrapper
{
public:
	explicit VixDiskLibErrWrapper(VixError errCode, const char* file, int line)
		:
		_errCode(errCode),
		_file(file),
		_line(line)
	{
		char* msg = VixDiskLib_GetErrorText(errCode, NULL);
		_desc = msg;
		VixDiskLib_FreeErrorText(msg);
	}

	VixDiskLibErrWrapper(const char* description, const char* file, int line)
		:
		_errCode(VIX_E_FAIL),
		_desc(description),
		_file(file),
		_line(line)
	{
	}

	string Description() const { return _desc; }
	VixError ErrorCode() const { return _errCode; }
	string File() const { return _file; }
	int Line() const { return _line; }

private:
	VixError _errCode;
	string _desc;
	string _file;
	int _line;
};

/*
*--------------------------------------------------------------------------
*
* PrintUsage --
*
*      Displays the usage message.
*
* Results:
*      1.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static int
PrintUsage(void)
{
	printf("Usage: vixdisklib(.exe) command [options] diskPath\n\n");

	printf("List of commands (all commands are mutually exclusive):\n");
	printf(" -mount : Mounts target VM disk on to the proxy.\n");

	printf("options:\n");
	printf(" -host hostname : hostname/IP address of VC/vSphere host (Mandatory)\n");
	printf(" -user userid : user name on host (Mandatory) \n");
	printf(" -password password : password on host. (Mandatory)\n");
	printf(" -port port : port to use to connect to VC/ESXi host (default = 443) \n");
	printf(" -nfchostport port : port to use to establish NFC connection to ESXi host (default = 902) \n");
	printf(" -vm moref=id : id is the managed object reference of the VM \n");
	printf(" -mode mode : Mode string to pass into VixDiskLib_ConnectEx. "
		"Valid modes are: nbd, nbdssl, san, hotadd \n");
	printf(" -thumb string : Provides a SSL thumbprint string for validation. "
		"Format: xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx\n");

	return 1;
}


/*
*--------------------------------------------------------------------------
*
* main --
*
*      Main routine of the program.
*
* Results:
*      None.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

int
main(int argc, char* argv[])
{
	int retval;
	bool bVixInit(false);

	memset(&appGlobals, 0, sizeof appGlobals);
	appGlobals.command = 0;
	appGlobals.openFlags = 0;
	appGlobals.isRemote = FALSE;

	retval = ParseArguments(argc, argv);
	if (retval) {
		return retval;
	}

	VixDiskLibConnectParams *cnxParams = VixDiskLib_AllocateConnectParams();
	VixError vixError;
	try {

		cnxParams->specType = VIXDISKLIB_SPEC_VMX;
		cnxParams->vmxSpec = appGlobals.vmxSpec;
		cnxParams->serverName = appGlobals.host;

		cnxParams->credType = VIXDISKLIB_CRED_UID;
		cnxParams->creds.uid.password = appGlobals.password;
		cnxParams->creds.uid.userName = appGlobals.userName;

		cnxParams->thumbPrint =
			(appGlobals.thumbPrint != NULL) ? appGlobals.thumbPrint : NULL;
		cnxParams->port = appGlobals.port;
		cnxParams->nfcHostPort = appGlobals.nfcHostPort;

		vixError = VixDiskLib_Init(VIXDISKLIB_VERSION_MAJOR,
			VIXDISKLIB_VERSION_MINOR,
			&LogFunc, &WarnFunc, &PanicFunc, // Log, warn, panic
			appGlobals.libdir);

		CHECK_AND_THROW(vixError);
		bVixInit = true;

		VixMntapi_Init(VIXMNTAPI_MAJOR_VERSION,
			VIXMNTAPI_MINOR_VERSION,
			&LogFunc, &WarnFunc, &PanicFunc,
			NULL, NULL);
		vixError = VixDiskLib_Connect(cnxParams, &appGlobals.connection);
		DoMntApi(appGlobals.connection, appGlobals.diskPaths[0].c_str(), appGlobals.openFlags);
		retval = 0;

	}
	catch (const VixDiskLibErrWrapper& e) {
		cout << "Error: [" << e.File() << ":" << e.Line() << "]  " <<
			std::hex << e.ErrorCode() << " " << e.Description() << "\n";
		retval = 1;
	}

	if (appGlobals.connection != NULL) {
		VixDiskLib_Disconnect(appGlobals.connection);
	}
	VixDiskLib_FreeConnectParams(cnxParams);

	VixMntapi_Exit();

	if (bVixInit) {
		VixDiskLib_Exit();
	}
	return retval;
}

/*
*--------------------------------------------------------------------------
*
* ParseArguments --
*
*      Parses the arguments passed on the command line.
*
* Results:
*      None.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static int
ParseArguments(int argc, char* argv[])
{
	int i;
	if (argc < 3) {
		printf("Error: Too few arguments. See usage below.\n\n");
		return PrintUsage();
	}
	for (i = 1; i < argc; i++) {
		if (!strcmp(argv[i], "-host")) {
			if (i >= argc - 2) {
				printf("Error: The -host option requires the IP address "
					"or name of the host to be specified. "
					"See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.host = argv[++i];
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-user")) {
			if (i >= argc - 2) {
				printf("Error: The -user option requires a username "
					"to be specified. See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.userName = argv[++i];
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-password")) {
			if (i >= argc - 2) {
				printf("Error: The -password option requires a password "
					"to be specified. See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.password = argv[++i];
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-thumb")) {
			if (i >= argc - 2) {
				printf("Error: The -thumb option requires an SSL thumbprint "
					"to be specified. See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.thumbPrint = argv[++i];
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-port")) {
			if (i >= argc - 2) {
				printf("Error: The -port option requires the host's port "
					"number to be specified. See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.port = strtol(argv[++i], NULL, 0);
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-nfchostport")) {
			if (i >= argc - 2) {
				return PrintUsage();
			}
			appGlobals.nfcHostPort = strtol(argv[++i], NULL, 0);
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-vm")) {
			if (i >= argc - 2) {
				printf("Error: The -vm option requires the moref id of "
					"the vm to be specified. See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.vmxSpec = argv[++i];
			appGlobals.isRemote = TRUE;
		}
		else if (!strcmp(argv[i], "-mode")) {
			if (i >= argc - 2) {
				printf("Error: The -mode option requires a mode string to  "
					"connect to VixDiskLib_ConnectEx. Valid modes are "
					"'nbd', 'nbdssl', 'san' and 'hotadd'. "
					"See usage below.\n\n");
				return PrintUsage();
			}
			appGlobals.transportModes = argv[++i];
		}
		else if (!strcmp(argv[i], "-mount")) {
			appGlobals.command |= COMMAND_MOUNT;
			appGlobals.isRemote = TRUE;
		}
		else if (argv[i][0] != '-') {
			// start of disk path
			break;
		}
	}
	for (; i < argc; ++i)
	{
		appGlobals.diskPaths.push_back(argv[i]);
	}

	if (appGlobals.diskPaths.size() == 0) {
		printf("Error: Missing diskPath. See usage below.\n");
		return PrintUsage();
	}

	if (BitCount(appGlobals.command) != 1) {
		printf("Error: Missing command. See usage below.\n");
		return PrintUsage();
	}

	if (appGlobals.isRemote) {
		if (appGlobals.host == NULL ||
			appGlobals.userName == NULL ||
			appGlobals.password == NULL) {
			printf("Error: Missing a mandatory option. ");
			printf("-host, -user and -password must be specified. ");
			printf("See usage below.\n");
			return PrintUsage();
		}
	}

	return 0;
}


/*
*--------------------------------------------------------------------------
*
* BitCount --
*
*      Counts all the bits set in an int.
*
* Results:
*      Number of bits set to 1.
*
* Side effects:
*      None.
*
*--------------------------------------------------------------------------
*/

static int
BitCount(int number)    // IN
{
	int bits = 0;
	while (number) {
		number = number & (number - 1);
		bits++;
	}
	return bits;
}


template <typename Hdl, typename CloseHdl = VixError(*)(Hdl)>
class HdlWrap
{
public:
	HdlWrap(Hdl& hdl, CloseHdl clsHdl) : m_hdl(hdl), m_clsHdl(clsHdl)
	{}

	~HdlWrap()
	{
		m_clsHdl(m_hdl);
	}

private:
	Hdl m_hdl;
	CloseHdl m_clsHdl;

};

VixError VixMntapi_DismountVolume_True(VixVolumeHandle hdl)
{
	return VixMntapi_DismountVolume(hdl, TRUE);
}

typedef HdlWrap<VixDiskSetHandle> DiskSetHdl;
typedef HdlWrap<VixDiskSetInfo*, void(*)(VixDiskSetInfo*)> DiskSetInfo;
typedef HdlWrap<VixVolumeHandle*, void(*)(VixVolumeHandle*)> VolumeHdls;
typedef HdlWrap<VixVolumeHandle> VolumeHdl;
typedef HdlWrap<VixVolumeInfo*, void(*)(VixVolumeInfo*)> VolumeInfo;
static void DoMntApi(VixDiskLibConnection connection, const char* disk, uint32 openFlags)
{
	printf("\nCalling VixMntapi_OpenDisks...\n");
	const char* diskNames[1];
	diskNames[0] = static_cast<const char*>(disk);
	VixDiskSetHandle diskSetHandle = NULL;
	VixError err = VixMntapi_OpenDisks(connection,
		diskNames,
		1,
		VIXDISKLIB_FLAG_OPEN_READ_ONLY,
		&diskSetHandle);
	if (VIX_FAILED(err)) {
		throw VixDiskLibErrWrapper(err, __FILE__, __LINE__);
	}
	DiskSetHdl dsh(diskSetHandle, VixMntapi_CloseDiskSet);

	printf("\nCalling VixMntapi_GetDiskSetInfo...\n");
	VixDiskSetInfo *diskSetInfo = NULL;
	err = VixMntapi_GetDiskSetInfo(diskSetHandle, &diskSetInfo);

	if (VIX_FAILED(err)) {
		throw VixDiskLibErrWrapper(err, __FILE__, __LINE__);
	}
	DiskSetInfo dsi(diskSetInfo, VixMntapi_FreeDiskSetInfo);

	printf("DiskSet Info - flags %u (passed - %u), mountPoint %s.\n",
		diskSetInfo->openFlags, openFlags,
		diskSetInfo->mountPath);

	printf("\nCalling VixMntapi_GetVolumeHandles...\n");
	VixVolumeHandle *volumeHandles = NULL;
	size_t numVolumes = 0;
	err = VixMntapi_GetVolumeHandles(diskSetHandle,
		&numVolumes,
		&volumeHandles);
	if (VIX_FAILED(err)) {
		throw VixDiskLibErrWrapper(err, __FILE__, __LINE__);
	}
	VolumeHdls vh(volumeHandles, VixMntapi_FreeVolumeHandles);

	printf("Num Volumes %zd\n", numVolumes);

	printf("\nEnter the volume number from which to start the mounting: ");
	int j = 0;
	scanf("%d", &j);
	vector<shared_ptr<VolumeHdl> > vhset;
	vector<shared_ptr<VolumeInfo> > viset;
	for (int i = j - 1; i < numVolumes; ++i) {
		printf("\nCalling VixMntapi_MountVolume on volume %d\n", i + 1);
		err = VixMntapi_MountVolume(volumeHandles[i], TRUE);
		if (VIX_FAILED(err)) {
			VixDiskLibErrWrapper errWrap(err, __FILE__, __LINE__);
			cout << endl << "Error: " << errWrap.Description() << endl;
			continue;
		}
		VolumeHdl*a = new VolumeHdl(volumeHandles[i], VixMntapi_DismountVolume_True);
		vhset.push_back(shared_ptr<VolumeHdl>(a));

		printf("\nCalling VixMntapi_GetVolumeInfo on volume %d\n", i + 1);
		VixVolumeInfo* volInfo = NULL;
		err = VixMntapi_GetVolumeInfo(volumeHandles[i], &volInfo);
		if (VIX_FAILED(err)) {
			VixDiskLibErrWrapper errWrap(err, __FILE__, __LINE__);
			cout << endl << "Error: " << errWrap.Description() << endl;
			continue;
		}
		viset.push_back(shared_ptr<VolumeInfo>(new VolumeInfo(volInfo, VixMntapi_FreeVolumeInfo)));
		printf("\nMounted Volume %d, Type %d, isMounted %d, symLink %s, numGuestMountPoints %zd (%s)\n\n",
			i + 1, volInfo->type, volInfo->isMounted,
			volInfo->symbolicLink == NULL ? "<null>" : volInfo->symbolicLink,
			volInfo->numGuestMountPoints,
			(volInfo->numGuestMountPoints == 1) ? (volInfo->inGuestMountPoints[0]) : "<null>");

		/*
		*----------------------------------------------------------------------
		*
		* Mount Device to system unit
		*
		*----------------------------------------------------------------------
		*/

		#ifdef _WIN32

		std::wstringstream ansiSS;
		ansiSS << volInfo->symbolicLink;
		std::wstring sVolumeName = ansiSS.str();
		sVolumeName = sVolumeName.substr(3);
		sVolumeName.erase(sVolumeName.length() - 1);
		sVolumeName = L"\\Device" + sVolumeName;
		cout << endl << endl << "Defining MS-DOS device name \"U:\" for volume " << volInfo->symbolicLink << endl;
		cout << "=====================================================================================" << endl;

		if (DefineDosDeviceW(DDD_RAW_TARGET_PATH, L"U:", sVolumeName.c_str())) {
          HANDLE hDevice;
          std::wstring wsVolume = L"\\\\.\\U:";

          hDevice = CreateFileW(wsVolume.c_str(),
              GENERIC_READ,
              0, //FILE_SHARE_READ | FILE_SHARE_WRITE
              NULL,
              OPEN_EXISTING,
              FILE_ATTRIBUTE_NORMAL,
              NULL);

          if (hDevice == INVALID_HANDLE_VALUE) {
              printf("Error opening volume, err = %d\n", GetLastError());
          }
          else {
              WIN32_FIND_DATAW fdFile;
              std::wstring wsPath = L"U:\\*.*";
              HANDLE hFind = FindFirstFileW(wsPath.c_str(), &fdFile);
              std::string MountPoint = (volInfo->numGuestMountPoints == 1) ? (volInfo->inGuestMountPoints[0]) : "<null>";
              cout << "=====================================================================================" << endl;
              cout << "=== Dumping contents of target VM's (" << MountPoint << ") drive (Mounted at U: drive on proxy) ===" << endl;
              cout << "=====================================================================================" << endl;
              while (hFind != INVALID_HANDLE_VALUE) {
                  if (hFind != INVALID_HANDLE_VALUE) {
                      printf("Successfully read Object = '%S'\n", fdFile.cFileName);
                  }
                  else {
                      printf("Failed to read Object. Volume/NTFS filesystem is corrupt (%d)\n", GetLastError());
                  }
                  if (!FindNextFileW(hFind, &fdFile)) {
                      FindClose(hFind);
                      hFind = INVALID_HANDLE_VALUE;
                  }
              }

              ::MessageBoxW(NULL, L"Volume mounted under U: drive, press OK to unmount", L"Info", NULL);
              DefineDosDeviceW(DDD_RAW_TARGET_PATH |
                  DDD_REMOVE_DEFINITION |
                  DDD_EXACT_MATCH_ON_REMOVE, L"U:", sVolumeName.c_str());
          }
        }

        #endif

	}
}
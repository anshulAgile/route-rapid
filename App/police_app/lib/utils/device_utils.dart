import 'dart:io';

import 'package:police_app/utils/app_common/app_logger.dart';

import 'export_utils.dart';

class DeviceUtil {
  factory DeviceUtil() {
    return _singleton;
  }

  static final DeviceUtil _singleton = DeviceUtil._internal();

  DeviceUtil._internal() {
    Logger().v("====== Instance created DeviceUtil =======");
  }

  static String storeCurrentVersion = "CurrentVersion";

  String currentLanguageCode = "en";
  String _deviceId = '';
  String _deviceType = '';

  String get deviceId => _deviceId;

  final String _version = '';
  final String _buildNumber = '';
  bool isPhysicalDevice = false;

  String get versionName => '$_version ($_buildNumber)';

  String get deviceType => _deviceType;

  Future<String> loadCurrentVersion() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(storeCurrentVersion) ?? "";
  }

  Future<void> updateCurrentVersion() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString(storeCurrentVersion, versionName);
  }

  Future<void> updateDeviceInfo() async {
    // Getting Device Info
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    if (Platform.isAndroid) {
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      _deviceId = androidInfo.id;
      _deviceType = 'android';
      Logger().d("Device id is $_deviceId");
      isPhysicalDevice = androidInfo.isPhysicalDevice;
    } else if (Platform.isIOS) {
      IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
      _deviceId = iosInfo.identifierForVendor ?? '';
      _deviceType = 'ios';
      Logger().d("Device id is $_deviceId");
      isPhysicalDevice = iosInfo.isPhysicalDevice;
    } else {
      WebBrowserInfo browserInfo = await deviceInfo.webBrowserInfo;
      _deviceId = browserInfo.userAgent ?? '';
      _deviceType = 'web';
      Logger().d("Device id is $_deviceId");
    }
  }
}

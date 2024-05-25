import 'dart:io';

import 'package:ambulance_app/ui/style/components/dailog_components.dart';
import 'package:ambulance_app/utils/app_common/app_logger.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:geolocator/geolocator.dart';
import 'package:location/location.dart' as ll;

class PlatformChannel {
  Future<bool> checkForPermission(Permission permission) async {
    if (Platform.isIOS) {
      bool result = await _checkContactPermissionForIOS(permission);
      return result;
    } else if (Platform.isAndroid) {
      bool result = await _checkContactPermissionForAndroid(permission);
      return result;
    } else {
      return false;
    }
  }

  Future<bool> _checkContactPermissionForIOS(Permission permission) async {
    PermissionStatus permissionStatus = await permission.status;
    Logger().v(" PermissionStatus :: ${permissionStatus.toString()}");
    if (permissionStatus == PermissionStatus.granted) {
      return true;
    } else if (permissionStatus == PermissionStatus.limited) {
      return true;
    } else if (permissionStatus == PermissionStatus.denied) {
      Logger().v("PermissionGroup :: $permission");
      PermissionStatus status = await permission.request();
      return status == PermissionStatus.granted;
    } else if (permissionStatus == PermissionStatus.permanentlyDenied) {
      Logger().v("PermissionGroup :: $permission");
      return false;
    } else {
      return false;
    }
  }

  Future<bool> _checkContactPermissionForAndroid(Permission permission) async {
    PermissionStatus permissionStatus = await permission.status;
    Logger().v(" PermissionStatus :: ${permissionStatus.toString()}");
    if (permissionStatus == PermissionStatus.granted) {
      return true;
    } else if (permissionStatus == PermissionStatus.denied) {
      PermissionStatus pStatus = await permission.request();
      Logger().v(" PermissionStatus :: ${pStatus.toString()}");
      if (pStatus == PermissionStatus.granted) {
        return true;
      } else if (pStatus == PermissionStatus.permanentlyDenied) {
        return false;
      } else if (pStatus == PermissionStatus.denied) {
        return false;
      } else {
        bool status = await _checkContactPermissionForNeverAsk(permission);
        return status;
      }
    } else if (permissionStatus == PermissionStatus.permanentlyDenied) {
      return false;
    }
    return false;
  }

  Future<bool> _checkContactPermissionForNeverAsk(Permission permission) async {
    Logger().v("_check Persmission For NeverAsk");
    PermissionStatus permissionStatus = await permission.request();
    Logger().v(" PermissionStatus :: ${permissionStatus.toString()}");
    if (permissionStatus == PermissionStatus.granted) {
      return true;
    } else if (permissionStatus == PermissionStatus.permanentlyDenied) {
      return false;
    } else if (permissionStatus == PermissionStatus.denied) {
      return false;
    } else {
      bool status = await _checkContactPermissionForNeverAsk(permission);
      return status;
    }
  }

  Future<bool> openSettings() async {
    bool isOpened = await openAppSettings();
    return isOpened;
  }

  Future<bool> checkLocation() async {
    ll.Location location = ll.Location();
    bool serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      if (!serviceEnabled) {
        DialogComponent.showAlert(
          Get.context!,
          title: StringConstant.appName,
          message: StringConstant.msgDisableLocationService,
          arrButton: ["Open Setting", StringConstant.btnCancel],
          callback: (i) async {
            if (i == 0) {
              if (Platform.isIOS) {
                await openSettings();
              } else {
                Geolocator.openLocationSettings();
              }
            }
          },
        );

        // Geolocator.openLocationSettings();
        debugPrint('Location Denied once');
      }
    }

    return serviceEnabled;
  }
}

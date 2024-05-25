import 'package:ambulance_app/helper/network_util.dart';
import 'package:ambulance_app/models/user_model.dart';
import 'package:ambulance_app/utils/NotificationObject.dart';
import 'package:ambulance_app/utils/device_utils.dart';
import 'package:get/get.dart';

import 'utils/app_common/app_logger.dart';

class AppController extends GetxController {
  bool isLoggedIn = false;
  String route = '';
  var isInternetAvailable = true.obs;

  /// The function `initUserData()` sets up connectivity, updates device information, loads user data,
  /// and performs additional actions if the user is logged in.
  initUserData() async {
    Reachability reachability = Reachability();
    await reachability.setUpConnectivity();
    Logger().v("Network status : ${reachability.connectStatus}");

    await DeviceUtil().updateDeviceInfo();

    await userSingleton.loadUserData();

    if (await UserModel.isLoginVerified()) {
      await NotificationObject.currentObject.loadPastObjectDetails();
      // socketProvider.connectToServer();
    }
  }
}

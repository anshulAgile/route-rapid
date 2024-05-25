import 'package:ambulance_app/app_controller.dart';
import 'package:ambulance_app/utils/app_common/app_logger.dart';
import 'package:ambulance_app/utils/app_common/snackbar_util.dart';
import 'package:ambulance_app/utils/export_utils.dart';

class NetworkUtil {
  static Future<bool> isNetworkConnected() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.mobile) {
      return true;
    } else if (connectivityResult == ConnectivityResult.wifi) {
      return true;
    } else {
      return false;
    }
  }
}

class Reachability extends Object {
  final Connectivity _connectivity = Connectivity();

  // network change subscription
  // ignore: cancel_subscriptions
  StreamSubscription<ConnectivityResult>? connectivitySubscription;

  // current network status
  String _connectStatus = 'Unknown';

  String get connectStatus => _connectStatus;

  //Constant for check network status
  static const String _connectivityMobile = "ConnectivityResult.mobile";
  static const String _connectivityWifi = "ConnectivityResult.wifi";

  factory Reachability() {
    return _singleton;
  }

  static final Reachability _singleton = Reachability._internal();

  Reachability._internal() {
    connectivitySubscription = _connectivity.onConnectivityChanged.listen(
      (ConnectivityResult result) {
        _connectStatus = result.toString();
        Logger().v("ConnectionStatus :: = $_connectStatus");
        if ((_connectStatus == Reachability._connectivityMobile) || (_connectStatus == Reachability._connectivityWifi)) {
          if (Get.isRegistered<AppController>() == true) {
            AppController appController = Get.find<AppController>();
            appController.isInternetAvailable.value = true;
          }
        } else {
          if (Get.isRegistered<AppController>() == true) {
            AppController appController = Get.find<AppController>();
            appController.isInternetAvailable.value = false;
          }
          if (Get.context != null) {
            SnackBarUtil.showSnackBar(context: Get.context!, type: SnackType.error, message: StringConstant.noInternetMsg);
          }
        }
      },
    );
  }

  dispose() async {
    await connectivitySubscription?.cancel();
  }

  //cancel subscription for network change
  unregisterReachbilityChange() async {
    await dispose();
  }

  // set up initial
  Future<void> setUpConnectivity() async {
    String connectionStatus;

    try {
      connectionStatus = (await _connectivity.checkConnectivity()).toString();
      Logger().v("ConnectionStatus :: => $connectionStatus");
      _connectStatus = connectionStatus.toString();
      Logger().v("ConnectionStatus :: = $_connectStatus");
      if ((_connectStatus == Reachability._connectivityMobile) || (_connectStatus == Reachability._connectivityWifi)) {
        if (Get.isRegistered<AppController>() == true) {
          AppController appController = Get.find<AppController>();
          appController.isInternetAvailable.value = true;
        }
      } else {
        if (Get.isRegistered<AppController>() == true) {
          AppController appController = Get.find<AppController>();
          appController.isInternetAvailable.value = false;
        }
        if (Get.context != null) {
          SnackBarUtil.showSnackBar(context: Get.context!, type: SnackType.error, message: StringConstant.noInternetMsg);
        }
      }
    } on Exception catch (e) {
      if (kDebugMode) {
        print(e.toString());
      }
      connectionStatus = 'Failed to get connectivity.';
    }

    _connectStatus = connectionStatus;
    Logger().v("ConnectionStatus :: => $_connectStatus");
  }

  // check for network available
  bool isInterNetAvaialble() {
    Logger().v("ConnectionStatus :: => $_connectStatus");
    return (_connectStatus == Reachability._connectivityMobile) || (_connectStatus == Reachability._connectivityWifi);
  }
}

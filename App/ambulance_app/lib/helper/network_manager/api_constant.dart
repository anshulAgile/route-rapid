import 'dart:io';

import 'package:ambulance_app/helper/firebase_cloud_messeging.dart';
import 'package:ambulance_app/models/user_model.dart';
import 'package:ambulance_app/utils/app_common/app_logger.dart';
import 'package:ambulance_app/utils/device_utils.dart';

import '../../utils/export_utils.dart';

enum ApiType {
  login,
}

class ApiConstant {
  static const int statusCodeSuccess = 200;
  static const int statusCodeCreated = 201;
  static const int statusCodeNotFound = 404;
  static const int statusCodeServiceNotAvailable = 503;
  static const int statusCodeBadGateway = 502;
  static const int statusCodeServerError = 500;
  static const int statusCodeUnauthorized = 401;

  static const int timeoutDurationNormalAPIs = 120000;

  /// 30 seconds
  static const int timeoutDurationMultipartAPIs = 120000;

  /// 120 seconds

  ///default Location
  static String mapStyle = "assets/map_style.txt";
  static double staticLatitude = 35.946555;
  static double staticLongitude = -111.2388952;

  static const String appleAppSecret = '6270d76935434d8fafcbd794ccabbac7';

  static String baseDomain = 'https://node-goat-grub-backend.agiletechnologies.in';

  static String getValue(ApiType type) {
    Logger().i(baseDomain);
    switch (type) {
      case ApiType.login:
        return '/users/login';

      default:
        return "";
    }
  }

  /*
  * Tuple Sequence
  * - Url
  * - Header
  * - params
  * - files
  * */
  static Tuple4<String, Map<String, String>, Map<String, dynamic>, List<AppMultiPartFile>> requestParamsForSync(
    ApiType type, {
    Map<String, dynamic>? params,
    List<AppMultiPartFile> arrFile = const [],
    String? urlParams,
  }) {
    String apiUrl = ApiConstant.baseDomain + ApiConstant.getValue(type);

    if (urlParams != null) apiUrl = apiUrl + urlParams;

    Map<String, dynamic> paramsFinal = params ?? <String, dynamic>{};
    Map<String, String> headers = <String, String>{};

    if (type == ApiType.login || type == ApiType.login) {
      paramsFinal['deviceType'] = DeviceUtil().deviceType;
      paramsFinal['deviceId'] = DeviceUtil().deviceId;
      paramsFinal['deviceToken'] = FireBaseCloudMessagingWrapper().fcmToken;

      // headers['Content-Type'] = 'application/json';
    }

    if (userSingleton.accessToken != null && userSingleton.accessToken != '' && type != ApiType.login) {
      headers['Authorization'] = userSingleton.accessToken!;
    }

    Logger().d("Request Url :: $apiUrl");
    Logger().d("Request Params :: $paramsFinal");
    Logger().d("Request headers :: $headers");

    return Tuple4(apiUrl, headers, paramsFinal, arrFile);
  }
}

class AppMultiPartFile {
  List<File>? localFiles;
  String? key;

  AppMultiPartFile({this.localFiles, this.key});

  AppMultiPartFile.fromType({this.localFiles, this.key});
}

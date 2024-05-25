import 'dart:async';

import 'package:ambulance_app/models/user_model.dart';
import 'package:dio/dio.dart';

class AppInterceptors extends Interceptor {
  @override
  FutureOr<dynamic> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    if (userSingleton.accessToken != null && userSingleton.accessToken != '') {
      options.headers.addAll(
        {"Authorization": userSingleton.accessToken},
      );
      handler.next(options);
      return options;
    } else {
      handler.next(options);
    }
  }

  @override
  FutureOr<dynamic> onResponse(Response response, ResponseInterceptorHandler handler) {
    handler.next(response);
    return response;
  }

  // @override
  // FutureOr<dynamic> onError(DioError err, ErrorInterceptorHandler handler) {
  //   return err;
  // }
  @override
  FutureOr<dynamic> onError(DioError err, ErrorInterceptorHandler handler) {
    handler.next(err);

    /// Add this line in api_interceptor
    return err;
  }
}

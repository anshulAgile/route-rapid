import 'package:ambulance_app/models/user_model.dart';

class ResponseModel<T> {
  ResponseModel({this.status, this.message, this.data});

  late int? status;
  late String? message;
  T? data;

  ResponseModel.fromJson(Map<String, dynamic> json, int? statusCode) {
    status = json['status'];
    message = json['message'];
    data = (json['data'] == null || json["data"].length == 0)
        ? null
        : _handleClasses(
            json['data'],
          );
  }

  _handleClasses(json) {
    if (T == UserModel) {
      return UserModel.fromJson(json) as T;
    } else {
      return json;
    }
  }
}

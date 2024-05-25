import 'package:ambulance_app/ui/style/components/dailog_components.dart';
import 'package:ambulance_app/utils/NotificationObject.dart';
import 'package:ambulance_app/utils/app_common/preference_keys.dart';
import 'package:ambulance_app/utils/app_common/screen_routes.dart';
import 'package:ambulance_app/utils/export_utils.dart';

var userSingleton = UserModel.authModelSingleton;

class UserModel {
  UserModel._internal();

  static final UserModel authModelSingleton = UserModel._internal();

  factory UserModel() {
    return authModelSingleton;
  }

  UserModel.fromJson(Map<String, dynamic> json) {
    updateValue(json);
  }

  String? id;
  var firstName = "".obs;
  var lastName = "".obs;
  String? guideBlogLink;
  String? bio;
  String? email;
  String? phoneNumber;
  int? userType;
  double? lat;
  double? lng;
  String? city;
  var profile = "".obs;
  String? subscriptionType;
  bool? isSubscribed;
  int? signupStep;
  String? accessToken;
  String? birthdate;
  String? createdAt;

  RxString get fullName {
    return "${firstName.value} ${lastName.value}".obs;
  }

  Future<void> updateValue(Map<String, dynamic> json) async {
    id = json['_id'];
    firstName.value = json['firstName'] ?? "";
    lastName.value = json['lastName'] ?? "";
    userType = json['userType'] ?? 1;
    email = json['email'] ?? "";
    phoneNumber = json['phoneNumber'] ?? "";
    birthdate = json['birthdate'] ?? "";
    guideBlogLink = json['guideBlogLink'] ?? "";
    bio = json['bio'] ?? "";
    city = json['city'] ?? "";
    profile.value = json['profile'] ?? "";
    subscriptionType = json['subscriptionType'] ?? "";
    lat = json["lat"] != 0.0 || json["lat"] != 0 ? (double.tryParse(json["lat"].toString())) : null;
    lng = json["lng"] != 0.0 || json["lng"] != 0 ? (double.tryParse(json["lng"].toString())) : null;
    isSubscribed = json['isSubscribed'];
    signupStep = json['signupStep'];
    userType = json['userType'];
    createdAt = json['createdAt'];
    // if (isEditProfile == true) {
    //   accessToken = accessToken;
    // } else {
    //   accessToken = json['accessToken'];
    // }

    if (json['accessToken'] != null) {
      accessToken = json['accessToken'];
    } else {
      accessToken = accessToken;
    }

    saveUserData();
  }

  Future<void> saveUserData() async {
    final userDetails = toJson();
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    sharedPreferences.setString(PreferenceKeys.prefUserData, json.encode(userDetails));
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    map['_id'] = id;
    map['firstName'] = firstName.value;
    map['lastName'] = lastName.value;
    map['email'] = email;
    map['phoneNumber'] = phoneNumber;
    map['birthdate'] = birthdate;
    map['userType'] = userType;
    map['lat'] = lat;
    map['lng'] = lng;
    map['guideBlogLink'] = guideBlogLink;
    map['bio'] = bio;

    map['city'] = city;
    map['profile'] = profile.value;
    map['subscriptionType'] = subscriptionType;
    map['isSubscribed'] = isSubscribed;
    map['signupStep'] = signupStep;
    map['userType'] = userType;
    map['createdAt'] = createdAt;
    map['accessToken'] = accessToken;
    return map;
  }

  static Future<void> saveIsLoginVerified() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setBool(PreferenceKeys.loginVerified, true);
  }

  static Future<bool> isLoginVerified() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    return preferences.getBool(PreferenceKeys.loginVerified) ?? false;
  }

  static Future<void> saveIsOnBoardingDone() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setBool(PreferenceKeys.onBoardingScreen, true);
  }

  static Future<bool> isOnBoardingDone() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    return preferences.getBool(PreferenceKeys.onBoardingScreen) ?? false;
  }

  Future<void> clearPreference() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove(PreferenceKeys.prefUserData);
    // updateValue({});
  }

  Future<void> loadUserData() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String userStoredDetails = preferences.getString(PreferenceKeys.prefUserData) ?? '';
    if (userStoredDetails.isNotEmpty) {
      Map<String, dynamic> userDetails = json.decode(userStoredDetails);
      await updateValue(userDetails);
    }
  }

  user401LogOut() {
    return DialogComponent.showAlert(
      Get.context!,
      title: StringConstant.appName,
      message: StringConstant.sessionExpire,
      arrButton: [StringConstant.okay],
      callback: (btnIndex) {
        if (btnIndex == 0) {
          Get.offAllNamed(ScreenRoutesConstants.initialScreen);
          userSingleton.clearPreference();
          NotificationObject.currentObject.resetUserDetails();
        }
      },
      barrierDismissible: false,
    );
  }

  userBlock406({required String message}) {
    return DialogComponent.showAlert(
      Get.context!,
      title: StringConstant.appName,
      message: message,
      arrButton: [StringConstant.okay],
      callback: (btnIndex) {
        if (btnIndex == 0) {
          Get.offAllNamed(ScreenRoutesConstants.initialScreen);
          userSingleton.clearPreference();
        }
      },
      barrierDismissible: false,
    );
  }
}

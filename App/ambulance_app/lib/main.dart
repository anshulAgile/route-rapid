import 'dart:io';

import 'package:ambulance_app/app_controller.dart';
import 'package:ambulance_app/helper/firebase_cloud_messeging.dart';
import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:ambulance_app/utils/app_common/app_routes.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_places_picker/google_places_picker.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  if (Platform.isAndroid) {
    var androidInfo = await DeviceInfoPlugin().androidInfo;
    if (androidInfo.version.sdkInt >= 32) {
      FirebaseMessaging messaging = FirebaseMessaging.instance;
      await messaging.requestPermission(
        badge: true,
        announcement: true,
        sound: true,
        alert: true,
      );
    }
  }

  AppController appController = Get.put<AppController>(AppController());
  await appController.initUserData();

  await FireBaseCloudMessagingWrapper().getFCMToken();

  /// Place picker api key initialize
  PluginGooglePlacePicker.initialize(
    androidApiKey: "",
    iosApiKey: "",
  );

  runApp(const AmbulanceApp());
}

class AmbulanceApp extends StatelessWidget {
  const AmbulanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp],
    );
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: AppColors.transparentColor,
        statusBarIconBrightness: Brightness.dark,
      ),
    );

    return GetBuilder<AppController>(
      builder: (controller) {
        return ScreenUtilInit(
          designSize: const Size(432, 960),
          builder: (BuildContext context, Widget? child) {
            return GetMaterialApp(
              title: StringConstant.appName,
              theme: ThemeData(
                textSelectionTheme: const TextSelectionThemeData(
                  selectionHandleColor: AppColors.primaryColor, // Set your desired handle color
                ),
                appBarTheme: const AppBarTheme(
                  surfaceTintColor: AppColors.whiteColor,
                ),
                cupertinoOverrideTheme: const CupertinoThemeData(
                  // Overrides the Cupertino theme for iOS
                  primaryColor: AppColors.primaryColor,
                  // Set the selection handle color here
                ),
                useMaterial3: true,
                scaffoldBackgroundColor: AppColors.whiteColor,
                primaryColor: AppColors.primaryColor,
              ),

              debugShowCheckedModeBanner: false,
              getPages: AppRoutes.routes,
              initialRoute: controller.route,
              // initialRoute: ScreenRoutesConstants.bottomTab,
              // initialRoute: ScreenRoutesConstants.userInterestScreen,
            );
          },
        );
      },
    );
  }
}

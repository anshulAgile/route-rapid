// ignore_for_file: unused_local_variable

import 'dart:io' show Platform;
import 'dart:ui' as ui;

import 'package:dio/dio.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:police_app/utils/NotificationObject.dart';
import 'package:police_app/utils/app_common/app_logger.dart';

import '../utils/export_utils.dart';

class NotificationType {}

FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

@pragma('vm:entry-point')
Future _firebaseMessagingBackgroundHandler(message) async {
  Logger().v("showNotificationFromBackground $message");

  Map<String, dynamic> notification = <String, dynamic>{};
  if (Platform.isIOS) {
    notification = message?.data ?? <String, dynamic>{};
  } else {
    notification = message?.data ?? <String, dynamic>{};
  }

  Logger().v("showNotificationFromBackground ${message?.data}");

  _showNotification(notification);
}

class FireBaseCloudMessagingWrapper extends Object {
  FirebaseMessaging? _fireBaseMessaging;
  String _fcmToken = "";

  String get fcmToken => _fcmToken;
  bool _isAppStarted = false; // Used for identify if navigation instance created

  factory FireBaseCloudMessagingWrapper() {
    return _singleton;
  }

  static final FireBaseCloudMessagingWrapper _singleton = FireBaseCloudMessagingWrapper._internal();

  void dispose() {}

  FireBaseCloudMessagingWrapper._internal() {
    Logger().e("===== Firebase Messaging instance created =====");
    _fireBaseMessaging = FirebaseMessaging.instance;
    firebaseCloudMessagingListeners();
  }

  Future<String?> getFCMToken() async {
    try {
      await intializelocalNotification();
      String? token = await _fireBaseMessaging?.getToken();
      if ((token ?? '').isNotEmpty) {
        _fcmToken = token ?? '';
        Logger().e("FCM Token :: $token");
        if (kDebugMode) {
          print("FCM Token :: $token");
        }
      }
      return _fcmToken;
    } catch (e) {
      Logger().v("Error :: ${e.toString()}");
      return null;
    }
  }

  void iOSPermission() async {
    NotificationSettings settings = await _fireBaseMessaging!.requestPermission(
      alert: true,
      badge: true,
      sound: true,
      criticalAlert: true,
    );
    if (kDebugMode) {
      print('User granted permission: ${settings.authorizationStatus}');
    }
    _fireBaseMessaging!.getNotificationSettings();
  }

  void firebaseCloudMessagingListeners() {
    if (Platform.isIOS) iOSPermission();

    _fireBaseMessaging?.getInitialMessage().then((RemoteMessage? message) {
      Logger().v("getInitialMessage :: ${message?.data.toString()}");
      if (message != null) {
        if (_isAppStarted) {
          Logger().v("AppStarted$_isAppStarted");
          notificationOperation(payload: message.data);
        } else {
          Logger().v("Not AppStarted$_isAppStarted");
          var currentObject = NotificationObject.currentObject;
          currentObject.pendingNotification = message.data;
          currentObject.saveObject();
        }
      }
    });

    /// Background Mode & App open This method called
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      Logger().v("onMessage :: ${message.data.toString()}");
      // playAudioFromLocal(soundFile: "carsound.mp3");
      Future.delayed(const Duration(seconds: 1), () => displayNotificationView(payload: message));
    });

    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      Logger().v("onMessageOpenedApp :: ${message.data.toString()}");
      Future.delayed(const Duration(milliseconds: 100), () {
        notificationOperation(payload: message.data);
      });
    });

    // HeadsUpNotificationAndroidConfiguration();
    // HeadsUpNotificationIOSConfiguration();
    /// If you want custom sound then below method called.
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  }

  bool hasPendingNotifications() {
    var currentObject = NotificationObject.currentObject;
    if (currentObject.pendingNotification == null) {
      return false;
    } else {
      return true;
    }
  }

  performPendingNotificationOperation() {
    _isAppStarted = true;
    Logger().e("Check Operation for pending notification");
    var currentObject = NotificationObject.currentObject;
    if (currentObject.pendingNotification == null) {
      return;
    }
    NotificationObject.currentObject.resetUserDetails();
    notificationOperation(payload: currentObject.pendingNotification!);
  }

  //region notification action view
  Future<void> displayNotificationView({required RemoteMessage payload}) async {
    Map<String, dynamic> notification = <String, dynamic>{};
    if (Platform.isAndroid) {
      notification = payload.data;
    } else {
      notification = payload.data;
    }
    if (payload.data.isEmpty && payload.notification != null) {
      notification["title"] = payload.notification?.title ?? "";
      notification["body"] = payload.notification?.body ?? "";
    }

    if (notification["message"] == null) {
    } else {}

    Logger().v("--- Display notification view ---");
    Logger().v("--- NOTIFICATION RESPOES${payload.data}");

    await _showNotification(notification);
    /* showOverlayNotification((BuildContext cont) {
      return SlideDismissible(
        key: Key('${payload.senderId ?? ''}_${DateTime.now().millisecondsSinceEpoch}'),
        direction: DismissDirection.up,
        child: NotificationView(
            title: title,
            subTitle: body,
            onTap: (isAllow) {
              OverlaySupportEntry.of(cont)?.dismiss();
              if (isAllow) {
                notificationOperation(payload: payload.data);
              }
            }),
      );
    }, duration: const Duration(milliseconds: 5000));*/
    // if (SocketProvider().isChatScreenOpen == true && type == NotificationType.chatNotification) {
    //   return;
    // }
  }

  //endregion

  //region notificationOperation or input action
  Future<void> notificationOperation({Map<String, dynamic>? payload, bool fromHomeScreen = false}) async {
    String type = "";
    String redirectType = "";
    String id = "";
    String userId = "";

    Map<String, dynamic> notification = payload ?? <String, dynamic>{};

    type = notification['type'] ?? '';
    redirectType = notification['redirectType'] ?? '';
    id = notification['_id'] ?? '';
    userId = notification['senderId'] ?? '';

    Logger().v(" Notification On tap Detected $type ");
    Logger().v(" Payload $payload ");

    var jsonDataDecode = jsonDecode(payload?["data"] ?? "") as Map<String, dynamic>;
    String restaurantId = jsonDataDecode['restaurantId'] ?? '';

    if (type == "") {
      // Get.to(
      //     SearchFindFoodListScreen(
      //       searchItem: jsonDataDecode["name"] ?? "",
      //       mealItem: MealCuisineItemModel.fromNotification(
      //           id: jsonDataDecode["_id"] ?? "", itemName: jsonDataDecode["name"] ?? "", isPremium: jsonDataDecode["isPremium"] ?? ""),
      //       cuisineItem: null,
      //     ),
      //     binding: SearchFindFoodListBindings());
    }
  }
}

Future<void> _showNotification(Map<String, dynamic> payload) async {
  // Initialize the plugin

  final bool? result =
      await flutterLocalNotificationsPlugin.resolvePlatformSpecificImplementation<IOSFlutterLocalNotificationsPlugin>()?.requestPermissions(
            alert: true,
            badge: true,
            sound: true,
          );

  DarwinNotificationDetails iosPlatformChannelSpecifics = DarwinNotificationDetails(
    presentAlert: true,
    presentBadge: true,
    presentSound: true,
    sound: (payload['sound'] == "" && payload['sound'] == 'default') ? "" : payload['sound'],
  );

  var channelID = (payload["sound"] != null && payload['sound'] != "" && payload['sound'] != 'default')
      ? payload["sound"].toString().split(".").first
      : "channel_id";
  var channelName = (payload["sound"] != null && payload['sound'] != "" && payload['sound'] != 'default')
      ? payload["sound"].toString().split(".").first
      : "channel_name";

  AndroidNotificationDetails androidPlatformChannelSpecifics = AndroidNotificationDetails(
    channelID,
    channelName,
    importance: Importance.max,
    priority: Priority.high,
    icon: '@mipmap/ic_launcher',
    styleInformation: (payload["image"] ?? "").toString().isEmpty ? null : BigPictureStyleInformation(await getAndroidBitmap(payload["image"] ?? "")),
    playSound: true,
  );

  NotificationDetails platformChannelSpecifics = NotificationDetails(android: androidPlatformChannelSpecifics, iOS: iosPlatformChannelSpecifics);

  // Show the notification
  await flutterLocalNotificationsPlugin.show(Random().nextInt(1000), payload['title'], payload['body'], platformChannelSpecifics,
      payload: jsonEncode(payload));
}

Future<void> intializelocalNotification() async {
  final List<DarwinNotificationCategory> darwinNotificationCategories = <DarwinNotificationCategory>[
    DarwinNotificationCategory(
      'textCategory',
      actions: <DarwinNotificationAction>[
        DarwinNotificationAction.text(
          'text_1',
          'Action 1',
          buttonTitle: 'Send',
          placeholder: 'Placeholder',
        ),
      ],
    ),
    DarwinNotificationCategory(
      'textCategory',
      actions: <DarwinNotificationAction>[
        DarwinNotificationAction.plain('id_1', 'Action 1'),
        DarwinNotificationAction.plain(
          'id_2',
          'Action 2 (destructive)',
          options: <DarwinNotificationActionOption>{
            DarwinNotificationActionOption.destructive,
          },
        ),
        DarwinNotificationAction.plain(
          'id_3',
          'Action 3 (foreground)',
          options: <DarwinNotificationActionOption>{
            DarwinNotificationActionOption.foreground,
          },
        ),
        DarwinNotificationAction.plain(
          'id_4',
          'Action 4 (auth required)',
          options: <DarwinNotificationActionOption>{
            DarwinNotificationActionOption.authenticationRequired,
          },
        ),
      ],
      options: <DarwinNotificationCategoryOption>{
        DarwinNotificationCategoryOption.hiddenPreviewShowTitle,
      },
    )
  ];

  /// Note: permissions aren't requested here just to demonstrate that can be
  /// done later
  final DarwinInitializationSettings initializationSettingsDarwin = DarwinInitializationSettings(
    requestAlertPermission: true,
    requestBadgePermission: true,
    requestSoundPermission: true,
    defaultPresentAlert: true,
    defaultPresentSound: true,
    defaultPresentBadge: true,
    onDidReceiveLocalNotification: (int id, String? title, String? body, String? payload) async {
      Logger().v("NOTIFICIRTON TAPPPPPPP");
      if (kDebugMode) {
        print("NOTIFICIRTON TAPPPPPPP${payload ?? ""}");
      }
    },
    notificationCategories: darwinNotificationCategories,
  );
  // Configure the notification settings
  const AndroidInitializationSettings androidInitializationSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
  final InitializationSettings initializationSettings =
      InitializationSettings(android: androidInitializationSettings, iOS: initializationSettingsDarwin);
  await flutterLocalNotificationsPlugin.initialize(initializationSettings, onDidReceiveBackgroundNotificationResponse: notificationTapBackground,
      onDidReceiveNotificationResponse: (response) async {
    Logger().v("NotificationTapped${jsonDecode(response.payload ?? "")}");
    if (kDebugMode) {
      print("NotificationTapped${jsonDecode(response.payload ?? "")}");
    }

    /// Todo:-  Navigate to the Pages
    var mapJson = jsonDecode(response.payload ?? "") as Map<String, dynamic>;
    navigateToTheScreenFormNotification(mapJson);
  });
}

void navigateToTheScreenFormNotification(Map<String, dynamic> json) {
  var notificationType = json["type"] ?? "";
  Map<String, dynamic> jsonDataDecode = <String, dynamic>{};

  if (notificationType == '') {
    // Get.to(
    //     SearchFindFoodListScreen(
    //       searchItem: jsonDataDecode["name"] ?? "",
    //       mealItem: MealCuisineItemModel.fromNotification(
    //           id: jsonDataDecode["_id"] ?? "", itemName: jsonDataDecode["name"] ?? "", isPremium: jsonDataDecode["isPremium"] ?? ""),
    //       cuisineItem: null,
    //     ),
    //     binding: SearchFindFoodListBindings());
  }
}

Future<ui.Image> getImageFromUrl(String url) async {
  final response = await Dio().get(url, options: Options(responseType: ResponseType.bytes));
  final bytes = response.data;
  final codec = await ui.instantiateImageCodec(bytes);
  final frame = await codec.getNextFrame();
  return frame.image;
}

Future<AndroidBitmap<Object>> getAndroidBitmap(String imageUrl) async {
  ui.Image image = await getImageFromUrl(imageUrl);
  ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
  Uint8List? pngBytes = byteData?.buffer.asUint8List();
  return ByteArrayAndroidBitmap.fromBase64String(base64Encode(pngBytes!));
}

@pragma('vm:entry-point')
void notificationTapBackground(NotificationResponse notificationResponse) {
  Logger().v("notificationTapBackground");
  if (kDebugMode) {
    print("showNotificationFromBackground ${notificationResponse.payload ?? ""}");
  }
  Logger().v("showNotificationFromBackground ${notificationResponse.payload ?? ""}");
  _showNotification(jsonDecode(notificationResponse.payload ?? ""));
}

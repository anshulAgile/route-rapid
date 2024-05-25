// ignore_for_file: unnecessary_null_comparison

import 'dart:io';
import 'dart:ui' as ui;

// ignore: library_prefixes
import 'package:ambulance_app/helper/network_manager/api_constant.dart';
import 'package:ambulance_app/helper/platform_channel/platform_channel.dart';
import 'package:ambulance_app/models/user_model.dart';
import 'package:ambulance_app/ui/style/components/dailog_components.dart';
import 'package:ambulance_app/ui/style/components/showloader_component.dart';
import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import 'export_utils.dart';

class MapUtils {
  factory MapUtils() {
    return _instance;
  }

  static final MapUtils _instance = MapUtils._internal();

  MapUtils._internal();

  // convert icon to bitmap for map
  getBitmapIcon(String image) {
    return BitmapDescriptor.fromAssetImage(const ImageConfiguration(devicePixelRatio: 2.5), image);
  }

  Future<Uint8List> getBytesFromAsset(String path, int width) async {
    ByteData data = await rootBundle.load(path);
    ui.Codec codec = await ui.instantiateImageCodec(data.buffer.asUint8List(), targetWidth: width);
    ui.FrameInfo fi = await codec.getNextFrame();
    return (await fi.image.toByteData(format: ui.ImageByteFormat.png))!.buffer.asUint8List();
  }

  // TO Focus Camera between two points
  cameraLocationUpdate(LatLng source, LatLng destination, GoogleMapController mapController, double padding) {
    LatLngBounds bound;
    if (source.latitude > destination.latitude && source.longitude > destination.longitude) {
      bound = LatLngBounds(southwest: destination, northeast: source);
    } else if (source.longitude > destination.longitude) {
      bound = LatLngBounds(southwest: LatLng(source.latitude, destination.longitude), northeast: LatLng(destination.latitude, source.longitude));
    } else if (source.latitude > destination.latitude) {
      bound = LatLngBounds(southwest: LatLng(destination.latitude, source.longitude), northeast: LatLng(source.latitude, destination.longitude));
    } else {
      bound = LatLngBounds(southwest: source, northeast: destination);
    }

    CameraUpdate u2 = CameraUpdate.newLatLngBounds(
      bound,
      padding,
    );
    mapController.animateCamera(u2).then((void v) {
      check(u2, mapController);
    });
  }

  getLatLngBounds(LatLng source, LatLng destination) {
    LatLngBounds bound;

    if (source.latitude > destination.latitude && source.longitude > destination.longitude) {
      bound = LatLngBounds(southwest: destination, northeast: source);
    } else if (source.longitude > destination.longitude) {
      bound = LatLngBounds(southwest: LatLng(source.latitude, destination.longitude), northeast: LatLng(destination.latitude, source.longitude));
    } else if (source.latitude > destination.latitude) {
      bound = LatLngBounds(southwest: LatLng(destination.latitude, source.longitude), northeast: LatLng(source.latitude, destination.longitude));
    } else {
      bound = LatLngBounds(southwest: source, northeast: destination);
    }

    return bound;
  }

  cameraLocationUpdateForList(List<LatLng> latlngs, GoogleMapController mapController, double padding) {
    LatLngBounds bound = getLatLngBounds(latlngs[0], latlngs[0]);

    double highestlat = latlngs[0].latitude;
    double highestlon = latlngs[0].longitude;
    double lowestlat = latlngs[0].latitude;
    double lowestlng = latlngs[0].longitude;

    for (int i = 0; i < latlngs.length; i++) {
      if (latlngs[i].latitude > highestlat) highestlat = latlngs[i].latitude;

      if (latlngs[i].longitude > highestlon) highestlon = latlngs[i].longitude;

      if (latlngs[i].latitude < lowestlat) lowestlat = latlngs[i].latitude;

      if (latlngs[i].longitude < lowestlng) lowestlng = latlngs[i].longitude;
    }

    bound = LatLngBounds(
      northeast: LatLng(highestlat, highestlon),
      southwest: LatLng(lowestlat, lowestlng),
    );

    CameraUpdate u2 = CameraUpdate.newLatLngBounds(
      bound,
      padding,
    );
    mapController.animateCamera(u2).then((void v) {
      check(u2, mapController);
      check(u2, mapController);
    });
  }

  void check(CameraUpdate u, GoogleMapController c) async {
    c.animateCamera(u);
    c.animateCamera(u);
    LatLngBounds l1 = await c.getVisibleRegion();
    LatLngBounds l2 = await c.getVisibleRegion();

    if (l1.southwest.latitude == -90 || l2.southwest.latitude == -90) check(u, c);
  }

  /// adjust zoom level based on two  markers
  Future<void> updateCameraLocation(
    LatLng source,
    LatLng destination,
    GoogleMapController mapController,
  ) async {
    if (mapController == null) return;

    LatLngBounds bounds;

    if (source.latitude > destination.latitude && source.longitude > destination.longitude) {
      bounds = LatLngBounds(southwest: destination, northeast: source);
    } else if (source.longitude > destination.longitude) {
      bounds = LatLngBounds(southwest: LatLng(source.latitude, destination.longitude), northeast: LatLng(destination.latitude, source.longitude));
    } else if (source.latitude > destination.latitude) {
      bounds = LatLngBounds(southwest: LatLng(destination.latitude, source.longitude), northeast: LatLng(source.latitude, destination.longitude));
    } else {
      bounds = LatLngBounds(southwest: source, northeast: destination);
    }

    CameraUpdate cameraUpdate = CameraUpdate.newLatLngBounds(bounds, 60);

    return checkCameraLocation(cameraUpdate, mapController);
  }

  Future<void> checkCameraLocation(CameraUpdate cameraUpdate, GoogleMapController mapController) async {
    mapController.animateCamera(cameraUpdate);
    LatLngBounds l1 = await mapController.getVisibleRegion();
    LatLngBounds l2 = await mapController.getVisibleRegion();

    if (l1.southwest.latitude == -90 || l2.southwest.latitude == -90) {
      return checkCameraLocation(cameraUpdate, mapController);
    }
  }

  getLocation(
      {ValueChanged<bool>? callBack, Color loaderColor = AppColors.whiteColor, isShowProfileLocation = false, bool isCurrentLocation = false}) async {
    showLoader(loaderColor: loaderColor);
    await MapUtils().requestLocationPermissions(
        context: Get.context!,
        getLocationCallBack: (position) async {
          if (kDebugMode) {
            print(userSingleton.lat);
            print(userSingleton.lng);
          }

          var address = await placemarkFromCoordinates(isShowProfileLocation ? userSingleton.lat ?? position.latitude : position.latitude,
              isShowProfileLocation ? userSingleton.lng ?? position.longitude : position.longitude);

          if (kDebugMode) {
            print(address);
          }

          if (callBack != null) {
            callBack(true);
          }

          dismissLoader();
        });
  }

  requestLocationPermissions({BuildContext? context, ValueChanged<Position>? getLocationCallBack}) async {
    Map<Permission, PermissionStatus> statuses = await [Permission.location].request();
    var status = statuses[Permission.location];
    if (status == PermissionStatus.denied) {
      getLocationCallBack!(Position(
          latitude: ApiConstant.staticLatitude,
          longitude: ApiConstant.staticLongitude,
          accuracy: 0.0,
          altitude: 0.0,
          heading: 0.0,
          speed: 10.0,
          speedAccuracy: 0.0,
          floor: 0,
          isMocked: false,
          timestamp: DateTime.now(),
          altitudeAccuracy: 0.0,
          headingAccuracy: 0.0));
      // Utils.showAlert(
      //   context!,
      //   message: Translations.of(context).msgLocationNotEnabled,
      //   arrButton: [Translations.of(context).btnOk],
      //   callback: (index) {
      //     if (index == 0) {
      //       // requestLocationPermissions();
      //     }
      //   },
      // );
    } else if (status == PermissionStatus.permanentlyDenied) {
      DialogComponent.showAlert(
        Get.context!,
        message: StringConstant.msgLocationNotEnabled,
        arrButton: [StringConstant.settingText, StringConstant.btnCancel],
        callback: (index) {
          if (index == 0) {
            PlatformChannel().openSettings();
          } else {
            getLocationCallBack!(Position(
                latitude: ApiConstant.staticLatitude,
                longitude: ApiConstant.staticLongitude,
                accuracy: 0.0,
                altitude: 0.0,
                heading: 0.0,
                speed: 10.0,
                speedAccuracy: 0.0,
                floor: 0,
                isMocked: false,
                timestamp: DateTime.now(),
                altitudeAccuracy: 0.0,
                headingAccuracy: 0.0));
          }
        },
      );
    } else {
      bool serviceEnabled;
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        // UIUtils().showProgressDialog(context);
        DialogComponent.showAlert(
          Get.context!,
          message: StringConstant.msgDisableLocationService,
          arrButton: [StringConstant.settingText, StringConstant.btnCancel],
          barrierDismissible: false,
          callback: (index) {
            if (index == 0) {
              // final AndroidIntent intent = AndroidIntent(
              //     action: 'android.settings.LOCATION_SOURCE_SETTINGS');
              //
              // intent.launch();
              // Navigator.of(context, rootNavigator: true).pop();

              if (Platform.isIOS) {
                PlatformChannel().openSettings();
              } else {
                Geolocator.openLocationSettings();
              }
            } else {
              getLocationCallBack!(Position(
                  latitude: ApiConstant.staticLatitude,
                  longitude: ApiConstant.staticLongitude,
                  accuracy: 0.0,
                  altitude: 0.0,
                  heading: 0.0,
                  speed: 10.0,
                  speedAccuracy: 0.0,
                  floor: 0,
                  isMocked: false,
                  timestamp: DateTime.now(),
                  altitudeAccuracy: 0.0,
                  headingAccuracy: 0.0));
            }
          },
        );
        return Future.error('Location services are disabled.');
      }

      try {
        Position position = await Geolocator.getCurrentPosition();
        if (kDebugMode) {
          print("Location : $position");
        }
        getLocationCallBack!(position);
      } catch (error) {
        throw Exception("Error on server");
      }
    }
  }

  double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    const double earthRadius = 3958.8; // in miles

    double dLat = _toRadians(lat2 - lat1);
    double dLon = _toRadians(lon2 - lon1);

    double a = sin(dLat / 2) * sin(dLat / 2) + cos(_toRadians(lat1)) * cos(_toRadians(lat2)) * sin(dLon / 2) * sin(dLon / 2);
    double c = 2 * atan2(sqrt(a), sqrt(1 - a));

    double distance = earthRadius * c;
    return distance;
  }

  double _toRadians(double degree) {
    return degree * (pi / 180);
  }
}

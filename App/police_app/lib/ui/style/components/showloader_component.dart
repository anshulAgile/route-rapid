import 'package:police_app/utils/app_common/app_colors.dart';
import 'package:police_app/utils/app_common/app_logger.dart';
import 'package:police_app/utils/export_utils.dart';

dismissLoader() {
  Get.back();
}

showLoader({Color loaderColor = AppColors.whiteColor}) {
  Logger().v("Show Loader");

  PageRouteBuilder builder = PageRouteBuilder(
      opaque: false,
      pageBuilder: (con, _, __) {
        return WillPopScope(
          onWillPop: willPop,
          child: Container(
            color: Colors.black.withOpacity(0.4),
            height: MediaQuery.of(Get.context!).size.height,
            child: Center(child: CircularProgressIndicator()),
          ),
        );
      });
  Navigator.of(Get.context!).push(
    builder,
  );
}

Future<bool> willPop() async {
  return false;
}

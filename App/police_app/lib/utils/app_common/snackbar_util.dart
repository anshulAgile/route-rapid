import 'package:police_app/utils/app_common/app_colors.dart';
import 'package:police_app/utils/export_utils.dart';

enum SnackType { success, error, warning, info, orangeBackgroundError }

class SnackBarUtil {
  static void showSnackBar({
    required BuildContext context,
    required SnackType type,
    required String message,
  }) {
    SnackBar snackBar = SnackBar(
      content: Text(
        message,
        style: AppTextStyle.setTS(
          fontFamily: AppFont.metropolisSemiBold600,
          fontSize: 15,
          color: (type == SnackType.orangeBackgroundError) ? AppColors.primaryColor : AppColors.whiteColor,
        ),
      ),
      backgroundColor: getBackgroundColorByType(snackType: type),
    );
    ScaffoldMessenger.of(context).removeCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  static Color getBackgroundColorByType({required SnackType snackType}) {
    if (snackType == SnackType.success) {
      return AppColors.primaryColor;
    } else if (snackType == SnackType.warning) {
      return AppColors.primaryColor;
    } else if (snackType == SnackType.error) {
      return AppColors.primaryColor;
    } else if (snackType == SnackType.orangeBackgroundError) {
      return AppColors.whiteColor;
    } else {
      return AppColors.primaryColor;
    }
  }
}

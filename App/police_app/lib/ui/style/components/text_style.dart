import 'package:police_app/utils/app_common/app_colors.dart';
import 'package:police_app/utils/export_utils.dart';

class GoatGrubStyles {
  /// DEV NOTE -: Common Styles
  static TextStyle hintTextStyle({Color? color}) {
    return AppTextStyle.setTS(color: color ?? AppColors.hintTextColor, fontFamily: AppFont.metropolisRegular400, fontSize: 15);
  }

  static TextStyle textFieldTextStyle() {
    return AppTextStyle.setTS(color: AppColors.textfieldPlaceholderLabelColor, fontFamily: AppFont.metropolisRegular400, fontSize: 15);
  }

  static TextStyle textFieldTitleTextStyle() {
    return AppTextStyle.setTS(color: AppColors.textfieldPlaceholderLabelColor, fontFamily: AppFont.metropolisSemiBold600, fontSize: 15);
  }

  static TextStyle buttonTextStyle({Color? color}) {
    return AppTextStyle.setTS(color: color ?? AppColors.whiteColor, fontFamily: AppFont.metropolisSemiBold600, fontSize: 17);
  }

  static TextStyle appBarTitleTextStyle() {
    return AppTextStyle.setTS(color: AppColors.blackColor, fontFamily: AppFont.metropolisBold700, fontSize: 17);
  }
}

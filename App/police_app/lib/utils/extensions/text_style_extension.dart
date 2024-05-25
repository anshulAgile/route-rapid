import 'package:police_app/utils/app_common/app_colors.dart';
import 'package:police_app/utils/export_utils.dart';

extension AppTextStyle on TextStyle {
  static TextStyle setTS({
    FontStyle? fontStyle,
    String? fontFamily,
    int? fontSize,
    Color? color,
    FontWeight? fontWeight,
    bool isFixed = false,
    double? characterSpacing,
    double? wordSpacing,
    double? lineSpacing,
    TextDecoration? decoration,
  }) {
    double finalFontSize = (fontSize ?? 12).toDouble();
    if (!isFixed) {
      finalFontSize = finalFontSize.sp;
    }

    return TextStyle(
      fontSize: finalFontSize,
      fontWeight: fontWeight,
      fontFamily: fontFamily ?? AppFont.metropolisRegular400,
      color: color ?? AppColors.blackColor,
      letterSpacing: characterSpacing,
      wordSpacing: wordSpacing,
      height: lineSpacing,
      decoration: decoration,
    );
  }
}

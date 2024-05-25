import 'package:police_app/utils/app_common/app_colors.dart';
import 'package:police_app/utils/export_utils.dart';

mixin AppBarMixin<T extends StatefulWidget> on State<T> {
  PreferredSizeWidget createAppBar(
      {String? title,
      Widget? titleWidget,
      String? fontName,
      int? fontSize,
      bool? centerTitle,
      TextStyle? textStyle,
      Color? fontColor,
      Color? backgroundColor,
      double? elevation = 0.0,
      VoidCallback? onPressedLeftIcon,
      String? strLeftIconName,
      double? leftIconLeftPadding,
      Color? lefIconColor,
      List<Widget>? rightActions,
      Brightness? brightness,
      PreferredSizeWidget? bottom,
      SystemUiOverlayStyle? systemoverlayStyle,
      VoidCallback? onPressedRightIcon}) {
    textStyle ??= AppTextStyle.setTS(
      fontFamily: fontName ?? AppFont.metropolisBold700,
      fontSize: fontSize ?? 20,
      color: fontColor ?? AppColors.blackColor,
    );

    lefIconColor ??= AppColors.blackColor;
    centerTitle ??= true;
    rightActions ??= [];
    return AppBar(
      title: titleWidget ??
          Text(
            title ?? "",
            style: textStyle,
            maxLines: 1,
          ),
      centerTitle: centerTitle,
      surfaceTintColor: Colors.transparent,
      // brightness: brightness ?? Brightness.light,
      systemOverlayStyle: systemoverlayStyle,
      automaticallyImplyLeading: false,
      backgroundColor: backgroundColor ?? AppColors.whiteColor,
      elevation: elevation,
      leading: strLeftIconName != null
          ? GestureDetector(
              onTap: onPressedLeftIcon,
              child: Container(
                color: Colors.transparent,
                padding: EdgeInsets.only(left: leftIconLeftPadding ?? 0, right: 16.w),
                child: Center(
                  child: Image.asset(
                    strLeftIconName,
                    // height: 20.h,
                    // width: 20.73.w,
                    color: lefIconColor,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            )
          : null,
      actions: rightActions,
      bottom: bottom,
    );
  }
}

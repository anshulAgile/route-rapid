import 'package:ambulance_app/ui/style/components/ai_text_form_field.dart';
import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:ambulance_app/utils/app_common/app_images.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:ambulance_app/utils/extensions/sizedbox_extensions.dart';
import 'package:flutter/cupertino.dart';

mixin TextFieldMixin<T extends StatefulWidget> on State<T> {
  /*NOTE:-
   if you want to pass input decoration then need to set all decoration
   contentPadding for top and bottom space*/
  bool isVisible = false;

  Widget createTextField({
    TextFieldType textType = TextFieldType.none,
    Key? key,
    TextInputType? keyboardType,
    TextInputAction? action = TextInputAction.next,
    VoidCallback? onEditComplete,
    ValueChanged<String>? onChanged,
    FocusNode? focusNode,
    TextEditingController? controller,
    Color? textColor,
    bool isRightIconVisible = false,
    Color? cursorColor,
    bool? autoFocus,
    TextStyle? style,
    TextStyle? hintStyle,
    String? hintText,
    TextStyle? labelStyle,
    String? labelText,
    String? outsideLabelText,
    Widget? prefixIcon,
    bool isDense = false,
    Widget? suffixIcon,
    EdgeInsetsGeometry? contentPadding,
    bool? enabled,
    bool? isReadOnly,
    Color backgroundColor = AppColors.textfieldBGColor,
    GestureTapCallback? gestureTapCallback,
    TextCapitalization textCapitalization = TextCapitalization.none,
    bool obscureText = false,
    InputBorder? focusedBorderDecoration,
    InputBorder? enabledBorderDecoration,
    TextAlign align = TextAlign.start,
    Color? borderColor,
    String rightIcon = "",
    bool isBOrderVisible = false,
    VoidCallback? onRightIconClick,
    double? rightIconHeight,
    double? rightIconWith,
    int? maxLength,
    int maxLines = 1,
    int? minLines,
    double? radius,
    InputDecoration? outerInputDecoration,
    bool hintTextRequired = true,
    List<String>? autofillHintsList,
  }) {
    var textStyle = style;
    textStyle ??= AppTextStyle.setTS(
      fontFamily: AppFont.metropolisRegular400,
      fontSize: 15,
      color: AppColors.blackColor,
    );

    var borderDecoration = InputBorder.none;
    var inputDecoration = InputDecoration(
      labelText: labelText,
      labelStyle: labelStyle,
      hintText: hintText ?? "",
      isDense: isDense,
      contentPadding: contentPadding ?? const EdgeInsets.symmetric(vertical: 15, horizontal: 15.0),
      focusedBorder: focusedBorderDecoration ?? borderDecoration,
      enabledBorder: enabledBorderDecoration ?? borderDecoration,
      disabledBorder: borderDecoration,
      hintStyle: hintStyle ??
          AppTextStyle.setTS(
            fontFamily: AppFont.metropolisRegular400,
            fontSize: 15,
            color: AppColors.textfieldPlaceholderColor,
          ),
      prefixIcon: prefixIcon,
      suffixIcon: suffixIcon,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Visibility(
          visible: hintTextRequired,
          child: Row(
            children: [
              Text(outsideLabelText ?? hintText ?? "",
                  style: AppTextStyle.setTS(
                    fontFamily: AppFont.metropolisSemiBold600,
                    fontSize: 15,
                    color: AppColors.textfieldPlaceholderLabelColor,
                  )),
              // Visibility(
              //   visible: hintText == StringConstant.birthDateHint,
              //   child: Text(" ${hintText == StringConstant.birthDateHint ? StringConstant.birthDateOptional : ""}",
              //       style: GoatGrubTextStyle.setTS(
              //         fontFamily: AppFont.metropolisMedium500,
              //         fontSize: 15,
              //         color: AppColors.hintTextColor,
              //       )),
              // )
            ],
          ),
        ),
        Visibility(visible: hintTextRequired, child: 11.sizedBoxH),
        Stack(
          alignment: Alignment.centerRight,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(radius ?? 5.r),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 0.0),
                decoration: BoxDecoration(
                  color: backgroundColor,
                  border: isBOrderVisible == false ? null : Border.all(color: borderColor ?? AppColors.blackColor, width: 1),
                ),
                child: Theme(
                  data: Theme.of(context).copyWith(
                      textSelectionTheme: const TextSelectionThemeData(
                          selectionColor: AppColors.primaryColor, cursorColor: AppColors.primaryColor, selectionHandleColor: AppColors.primaryColor)),
                  child: AITextFormField(
                    key: key ?? const Key(""),
                    maxLength: maxLength,
                    textType: textType,
                    keyboardType: keyboardType,
                    action: action ?? TextInputAction.next,
                    onEditingComplete: onEditComplete,
                    onChanged: onChanged,
                    controller: controller,
                    focusNode: focusNode,
                    cursorColor: cursorColor ?? AppColors.primaryColor,
                    style: textStyle,
                    decoration: outerInputDecoration ?? inputDecoration,
                    shouldEnabled: enabled ?? true,
                    isReadOnly: isReadOnly ?? false,
                    gestureTapCallback: gestureTapCallback,
                    textCapitalization: textCapitalization,
                    obscureText: obscureText,
                    maxLines: maxLines,
                    minLines: minLines,
                    autofillHintsList: autofillHintsList,
                    textAlign: align,
                  ),
                ),
              ),
            ),
            Visibility(
              visible: isRightIconVisible,
              child: GestureDetector(
                onTap: onRightIconClick,
                child: Container(
                  color: Colors.transparent,
                  margin: const EdgeInsets.only(right: 8.0),
                  padding: const EdgeInsets.only(right: 20, left: 5.0, top: 5, bottom: 5),
                  child: Image.asset(
                    rightIcon,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            )
          ],
        ),
      ],
    );
  }

  Widget commonCupertinoSearchField(
      {required ValueChanged onSubmit, ValueChanged? onChanged, String? lefIcon, TextEditingController? controller, Function()? onSuffixTap}) {
    return Container(
      color: Colors.transparent,
      child: TextSelectionTheme(
        data: const TextSelectionThemeData(selectionColor: AppColors.primaryColor),
        child: CupertinoSearchTextField(
          controller: controller,
          backgroundColor: AppColors.textfieldBGColor,
          style: AppTextStyle.setTS(fontSize: 15, fontFamily: AppFont.metropolisRegular400, color: AppColors.blackColor),
          autocorrect: false,
          prefixIcon: GestureDetector(
            onTap: () {},
            child: Padding(
              padding: EdgeInsets.only(left: 24.w, right: 11.w),
              child: Image.asset(
                lefIcon ?? AppImages.searchBalck,
                height: 17.w,
                fit: BoxFit.contain,
              ),
            ),
          ),
          padding: const EdgeInsets.only(top: 16, bottom: 16),
          placeholder: StringConstant.search,
          placeholderStyle: AppTextStyle.setTS(fontSize: 15, fontFamily: AppFont.metropolisRegular400, color: AppColors.graySearchPlaceHolderColor),
          onSubmitted: (value) {
            onSubmit(value);
          },
          onChanged: (value) {
            if (onChanged != null) {
              onChanged(value);
            }
          },
          onSuffixTap: onSuffixTap,
          //     () {
          //   if (onSuffixTap != null) {
          //     ();
          //   }
          // },
        ),
      ),
    );
  }
}

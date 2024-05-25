// // ignore_for_file: must_be_immutable
//
// import 'package:police_app/utils/app_common/app_colors.dart';
// import 'package:police_app/utils/export_utils.dart';
//
// enum ButtonStyleEnum { rounded, rectangle, outlined, outlinedRounded, filled, iconText, iconTextGradient, gradient }
//
// class CommonButton extends StatelessWidget {
//   double? height;
//   double? width;
//   EdgeInsets? outerPadding;
//   EdgeInsets? outerMargin;
//   EdgeInsets? innerTextPadding;
//   EdgeInsets? rightIconPadding;
//   EdgeInsets? textPaddingFromIcon;
//   double? elevation;
//   Color? backgroundColor;
//   TextStyle? textStyle;
//   Color? borderColor;
//   Color? textColor;
//   bool isDisabled = false;
//   String? title;
//   TextAlign? textAlign;
//   ButtonStyleEnum? buttonStyle;
//   double? borderRadius;
//   String? rightIcon;
//   double? rightIconHeight;
//   double? rightIconWidth;
//   Color? rightIconColor;
//   VoidCallback onTap;
//
//   CommonButton(
//       {Key? key,
//       this.height,
//       this.rightIconColor,
//       this.buttonStyle,
//       this.borderRadius,
//       this.outerMargin,
//       this.outerPadding,
//       this.innerTextPadding,
//       this.backgroundColor,
//       this.elevation,
//       this.textStyle,
//       this.textPaddingFromIcon,
//       this.textColor,
//       this.title,
//       this.textAlign,
//       this.rightIconPadding,
//       this.isDisabled = false,
//       this.borderColor,
//       required this.onTap,
//       this.rightIcon,
//       this.rightIconWidth,
//       this.rightIconHeight,
//       this.width})
//       : super(key: key);
//
//   @override
//   Widget build(BuildContext context) {
//     textStyle =
//         textStyle ?? GoatGrubTextStyle.setTS(color: textColor ?? AppColors.whiteColor, fontFamily: AppFont.metropolisSemiBold600, fontSize: 17);
//     return (buttonStyle == ButtonStyleEnum.iconText || buttonStyle == ButtonStyleEnum.iconTextGradient)
//         ? getElevatedButtonWithIconText()
//         : Container(
//             height: height,
//             width: width ?? double.infinity,
//             padding: outerPadding,
//             margin: outerMargin,
//             child: (buttonStyle != ButtonStyleEnum.outlined && buttonStyle != ButtonStyleEnum.outlinedRounded)
//                 ? (buttonStyle == ButtonStyleEnum.gradient)
//                     ? Bounceable(
//                         onTap: onTap,
//                         scaleFactor: 0.86,
//                         child: Material(
//                           elevation: elevation ?? 0.0,
//                           color: Colors.transparent,
//                           shape: RoundedRectangleBorder(
//                             borderRadius: BorderRadius.circular(borderRadius ?? 10.0.r),
//                           ),
//                           child: Container(
//                             decoration: BoxDecoration(
//                                 borderRadius: BorderRadius.circular(borderRadius ?? 10.0.r),
//                                 color: isDisabled ? AppColors.disableGradientButtonColor : null,
//                                 gradient: isDisabled
//                                     ? null
//                                     : const LinearGradient(
//                                         begin: Alignment.topCenter,
//                                         end: Alignment.bottomCenter,
//                                         colors: [
//                                           Color(0xFFF68C3D),
//                                           Color(0xFFFF6D00),
//                                         ],
//                                       )),
//                             padding: innerTextPadding ?? EdgeInsets.symmetric(vertical: 16.h),
//                             width: double.infinity,
//                             child: Center(
//                               child: Text(title ?? "Sponsored", style: textStyle),
//                             ),
//                           ),
//                         ),
//                       )
//                     : Bounceable(
//                         onTap: onTap,
//                         scaleFactor: 0.86,
//                         child: Container(
//                           decoration:
//                               BoxDecoration(borderRadius: BorderRadius.circular(borderRadius ?? 10.0.r), color: backgroundColor ?? Colors.orange),
//                           padding: innerTextPadding ?? EdgeInsets.symmetric(vertical: 16.h),
//                           width: double.infinity,
//                           child: Center(
//                             child: Text(
//                               title ?? "",
//                               style: textStyle,
//                             ),
//                           ),
//                         ),
//                       )
//                 : Bounceable(
//                     onTap: onTap,
//                     scaleFactor: 0.86,
//                     child: Container(
//                       decoration: BoxDecoration(
//                           color: backgroundColor,
//                           borderRadius: BorderRadius.circular(borderRadius ?? 10.0),
//                           border: Border.all(color: borderColor ?? AppColors.whiteColor, width: 1)),
//                       width: double.infinity,
//                       padding: innerTextPadding ?? EdgeInsets.symmetric(vertical: 16.h),
//                       child: Center(
//                         child: Text(
//                           title ?? "",
//                           style: textStyle,
//                         ),
//                       ),
//                     ),
//                   ),
//           );
//   }
//
//   getButtonStyle() {
//     if (buttonStyle == ButtonStyleEnum.filled) {
//       return ButtonStyle(
//         shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
//           borderRadius: BorderRadius.circular(4.0.r),
//         )),
//         elevation: MaterialStateProperty.all(elevation),
//         backgroundColor: MaterialStateProperty.all(backgroundColor ?? const Color(0xFFE06A13)),
//         padding: MaterialStateProperty.all(innerTextPadding),
//       );
//     } else if (buttonStyle == ButtonStyleEnum.rectangle) {
//       return ButtonStyle(
//         shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
//           borderRadius: BorderRadius.circular(borderRadius ?? 0.0),
//         )),
//         elevation: MaterialStateProperty.all(elevation),
//         backgroundColor: MaterialStateProperty.all(backgroundColor ?? const Color(0xFFE06A13)),
//         padding: MaterialStateProperty.all(innerTextPadding),
//       );
//     } else if (buttonStyle == ButtonStyleEnum.rounded) {
//       return ElevatedButton.styleFrom(shape: const StadiumBorder());
//     }
//   }
//
//   getElevatedButtonWithIconText() {
//     return Bounceable(
//       onTap: onTap,
//       scaleFactor: 0.86,
//       child: Material(
//         elevation: elevation ?? 3.0,
//         color: Colors.transparent,
//         shape: RoundedRectangleBorder(
//           borderRadius: BorderRadius.circular(borderRadius ?? 10.0),
//         ),
//         child: Stack(
//           alignment: Alignment.centerRight,
//           children: [
//             // Container(
//             //   height: height,
//             //   width: width ?? double.infinity,
//             //   padding: outerPadding,
//             //   margin: outerMargin,
//             //   child: ElevatedButton(
//             //     onPressed: () {},
//             //     style: ButtonStyle(
//             //         shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
//             //           borderRadius: BorderRadius.circular(borderRadius ?? 4.0),
//             //         )),
//             //         elevation: MaterialStateProperty.all(elevation),
//             //         backgroundColor: MaterialStateProperty.all(backgroundColor ?? const Color(0xFFE06A13)),
//             //         padding: MaterialStateProperty.all(innerTextPadding),
//             //         alignment: Alignment.center),
//             //     child: Padding(
//             //       padding: textPaddingFromIcon ?? EdgeInsets.only(right: (title?.length ?? 0) > 36 ? 20 : 0),
//             //       child: Text(
//             //         title ?? "Sponsored",
//             //         textAlign: TextAlign.center,
//             //         style: textStyle ?? const TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
//             //       ),
//             //     ),
//             //   ),
//             // ),
//             Container(
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(borderRadius ?? 10.0),
//                 color: backgroundColor ?? (isDisabled ? AppColors.disableGradientButtonColor : null),
//                 gradient: backgroundColor == null
//                     ? isDisabled
//                         ? null
//                         : const LinearGradient(
//                             begin: Alignment.topCenter,
//                             end: Alignment.bottomCenter,
//                             colors: [
//                               Color(0xFFF68C3D),
//                               Color(0xFFFF6D00),
//                             ],
//                           )
//                     : null,
//               ),
//               padding: innerTextPadding ?? EdgeInsets.symmetric(vertical: 16.h),
//               width: width ?? double.infinity,
//               height: height,
//               child: Center(
//                 child: Padding(
//                   padding: textPaddingFromIcon ?? EdgeInsets.only(right: (title?.length ?? 0) > 20 ? 40 : 0),
//                   child: Text(
//                     title ?? "",
//                     textAlign: textAlign ?? TextAlign.center,
//                     style: textStyle,
//                   ),
//                 ),
//               ),
//             ),
//             Padding(
//               padding: rightIconPadding ?? const EdgeInsets.only(left: 20.0, right: 22.0),
//               child: Image.asset(
//                 rightIcon ?? "",
//                 height: rightIconHeight ?? 13.h,
//                 fit: BoxFit.contain,
//                 color: rightIconColor,
//                 width: rightIconWidth ?? 20,
//               ),
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }

// ignore_for_file: library_private_types_in_public_api

import 'dart:io';

import 'package:ambulance_app/ui/style/components/dailog_components.dart';
import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:flutter/cupertino.dart';

class AlertWidget extends StatefulWidget {
  final String? title;
  final String? message;
  final List<String>? buttonOption;
  final Widget? isRemoveGoat;
  final AlertWidgetButtonActionCallback? onCompletion;

  // ignore: use_key_in_widget_constructors
  const AlertWidget({this.title, this.message, this.buttonOption, this.onCompletion, this.isRemoveGoat});

  @override
  _AlertWidgetState createState() => _AlertWidgetState();
}

class _AlertWidgetState extends State<AlertWidget> {
  Widget? get titleWidget {
    String mainTitle = widget.title ?? '';
    if (mainTitle.isEmpty) {
      mainTitle = StringConstant.appName;
    }

    if (Platform.isIOS) {
      if (mainTitle.isNotEmpty) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Align(
            alignment: Alignment.topCenter,
            child: Text(
              mainTitle,
              style: AppTextStyle.setTS(
                fontFamily: AppFont.metropolisBold700,
                fontSize: 17,
                color: AppColors.darkBlackColor,
              ),
            ),
          ),
        );
      }
    } else if (Platform.isAndroid) {
      if (mainTitle.isNotEmpty) {
        return Text(
          mainTitle,
          style: AppTextStyle.setTS(
            fontFamily: AppFont.metropolisBold700,
            fontWeight: FontWeight.w500,
            fontSize: 17,
            color: AppColors.darkBlackColor,
          ),
          textAlign: TextAlign.center,
        );
      }
    }
    return null;
  }

  Widget? get messageWidget {
    if ((widget.message ?? '').isNotEmpty) {
      var messageW = widget.isRemoveGoat ??
          Text(
            widget.message ?? '',
            textAlign: TextAlign.center,
            style: AppTextStyle.setTS(
              fontFamily: AppFont.metropolisMedium500,
              fontSize: 14,
              color: AppColors.darkBlackColor,
            ),
          );
      return (Platform.isIOS)
          ? messageW
          : Padding(
              padding: const EdgeInsets.only(top: 10.0),
              child: messageW,
            );
    }
    return null;
  }

  List<Widget> get actionWidget {
    List<Widget> arrButtons = [];

    for (String str in (widget.buttonOption ?? [])) {
      Widget button;
      if (Platform.isIOS) {
        button = CupertinoDialogAction(
          isDestructiveAction: str.toLowerCase() == ("Cancel").toLowerCase(),
          child: Text(
            str,
            style: AppTextStyle.setTS(
              fontFamily: AppFont.metropolisSemiBold600,
              fontSize: 17,
              color: AppColors.darkBlackColor,
            ),
          ),
          onPressed: () => onButtonPressed(str),
        );
      } else {
        button = TextButton(
          child: Text(
            str,
            style: AppTextStyle.setTS(
              fontFamily: AppFont.metropolisSemiBold600,
              fontSize: 17,
              color: AppColors.darkBlackColor,
            ),
          ),
          onPressed: () => onButtonPressed(str),
        );
      }
      arrButtons.add(button);
    }
    return arrButtons;
  }

  @override
  Widget build(BuildContext context) {
    if (Platform.isIOS) {
      return CupertinoAlertDialog(
        title: titleWidget,
        content: messageWidget,
        actions: actionWidget,
      );
    } else {
      return AlertDialog(
        title: titleWidget,
        content: messageWidget,
        actions: actionWidget,
        actionsAlignment: MainAxisAlignment.spaceEvenly,
        backgroundColor: AppColors.whiteColor,
        contentPadding: const EdgeInsets.only(
          left: 24.0,
          right: 24.0,
          top: 10.0,
        ),
        actionsPadding: const EdgeInsets.only(bottom: 10, top: 10),
        // contentPadding: const EdgeInsets.fromLTRB(24.0, 7.0, 20.0, 12.0),
      );
    }
  }

  void onButtonPressed(String btnTitle) {
    int index = (widget.buttonOption ?? []).indexOf(btnTitle);

    //dismiss Diloag
    Navigator.of(context).pop();

    // Provide callback
    if (widget.onCompletion != null) {
      widget.onCompletion!(index);
    }
  }
}

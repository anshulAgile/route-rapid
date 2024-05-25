// ignore_for_file: library_private_types_in_public_api

import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

enum TextFieldType {
  email,
  password,
  phoneNumber,
  usaPhoneNumber,
  name,
  userName,
  numericOnly,
  numericWithSpace,
  numericNoZero,
  floatValue,
  charactersOnly,
  charactersWithSpace,
  charactersWithNumbers,
  charactersNumbersWithSpace,
  charactersWithSpecialCharacter,
  charactersSpecialCharacterWithSpace,
  price,
  card,
  none,
  cvv,
  zipcode,
  noneNoSpace,
  nameWithSpace,
  cardExpiry,
  decimalNumbers,
  temprature,
  humadity,
  barometer,
  searchField
}

class AITextFormField extends FormField<String> {
  final TextFieldType? textType;
  final TextInputType? keyboardType;
  final TextInputAction? action;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final VoidCallback? onEditingComplete;
  final ValueChanged<String>? onChanged;
  final InputDecoration? decoration;
  final int? minLength;
  final int? maxLength;
  final int? maxLenghtwithidicator;
  final bool? autofocus;
  final bool? autocorrect;
  final bool? obscureText;
  final TextStyle? style;
  final TextAlign? textAlign;
  final TextCapitalization? textCapitalization;
  final int maxLines;
  final int? minLines;
  final Color? cursorColor;
  final GestureTapCallback? gestureTapCallback;
  final bool shouldEnabled;
  final bool isReadOnly;
  final List<String>? autofillHintsList;

  AITextFormField({
    Key key = const Key(""),
    @required this.textType,
    this.keyboardType,
    this.action = TextInputAction.next,
    this.controller,
    this.focusNode,
    this.onEditingComplete,
    this.onChanged,
    this.decoration,
    this.minLength = 0,
    this.maxLength,
    this.maxLenghtwithidicator,
    this.autofocus = false,
    this.autocorrect = false,
    this.obscureText = false,
    this.style,
    this.minLines,
    this.textAlign = TextAlign.start,
    this.textCapitalization = TextCapitalization.none,
    this.maxLines = 1,
    this.cursorColor,
    this.shouldEnabled = true,
    this.isReadOnly = false,
    this.gestureTapCallback,
    this.autofillHintsList,
  }) : super(
            key: key,
            builder: (FormFieldState<String> field) {
              return Container();
            });

  @override
  _AITextFormFieldState createState() => _AITextFormFieldState();
}

class _AITextFormFieldState extends FormFieldState<String> {
  @override
  AITextFormField get widget => super.widget as AITextFormField;
  int max = 255, min = 1;

  @override
  void initState() {
    super.initState();
    max = widget.maxLength ?? _getMaxLength(widget.textType ?? TextFieldType.none);
    min = widget.minLength ?? _getMinLength(widget.textType ?? TextFieldType.none);
  }

  @override
  Widget build(BuildContext context) {
    List<TextInputFormatter> arrInputFormatter = _getListOfForamatter(widget.textType ?? TextFieldType.none, max);
    return TextField(
      onTap: widget.gestureTapCallback,
      enabled: widget.shouldEnabled,
      readOnly: widget.isReadOnly,
      enableSuggestions: false,
      keyboardType: widget.keyboardType ?? _getKeyBoardType(widget.textType ?? TextFieldType.none),
      textInputAction: widget.action,
      controller: widget.controller,
      focusNode: widget.focusNode,
      onEditingComplete: widget.onEditingComplete,
      onChanged: widget.onChanged,
      decoration: widget.decoration,
      autofillHints: widget.autofillHintsList,
      autofocus: widget.autofocus ?? false,
      autocorrect: widget.autocorrect ?? true,
      // textCapitalization: widget.textCapitalization ?? TextCapitalization.none,
      textCapitalization: widget.textCapitalization ?? TextCapitalization.sentences,
      obscureText: widget.obscureText ?? true,
      style: widget.style,
      textAlign: widget.textAlign ?? TextAlign.left,
      inputFormatters: arrInputFormatter,
      maxLines: widget.maxLines,
      maxLength: widget.maxLenghtwithidicator,
      cursorColor: widget.cursorColor,
      minLines: widget.minLines,
    );
  }
}

class CharacterSetType {
  static const String emailRegx1 = "^([a-zA-Z0-_9.’'@]+)*\$";

  //static final String passwordRegx = "^[a-z0-9A-Z]+([a-z0-9A-Z!@#%^&*()]+)*\$";
  static const String passwordRegx = "^[a-z0-9A-Z!@#\$%^&*(){}_+*/~`.?<>/-]*\$";

  //static final String passwordRegx = "^([a-z0-9A-Z!@#\$%^&*(){}[]_-+*/~`.?<>]+)*\$";

  static const String phoneNumberRegx = "^[0-9]*";
  static const String usaPhoneNumberRegex = r'^[0-9() -]*';

  //static final String nameRegx = "^[a-zA-Z]+([a-zA-Z’']+)*\$";
  static const String nameRegx = "^([a-zA-Z’']+)*\$";

  //static final String nameWithSpaceRegx = "^[a-zA-Z]+([a-zA-Z’' ]+)*\$";
  static const String nameWithSpaceRegx = "^([a-zA-Z’' ]+)*\$";

  //static final String userNameRegx = "^[a-zA-Z0-9]+([a-zA-Z0-9]+)*\$";
  static const String userNameRegx = "^([a-zA-Z0-9]+)*\$";

  static const String numberOnlyRegx = "^[0-9]*";

  //static final String numericWithSpaceRegx = "[0-9]+[0-9 ]*";
  static const String numericWithSpaceRegx = "[0-9 ]*";

  static const String numericNoZeroRegx = "^[1-9]*";

  static const String floatValueRegex = "^\$|^(0|([1-9][0-9]{0,}))(\\.[0-9]{0,2})?\$";

  static const String charactersOnlyRegex = "^[A-Za-z]*";

  //static final String charactersWithSpaceRegex = "^[a-zA-Z]+([a-zA-Z ]+)*\$";
  static const String charactersWithSpaceRegex = "^([a-zA-Z ]+)*\$";

  //static final String charactersWithNumbersRegex = "^[a-z0-9A-Z]+([a-z0-9A-Z]+)*\$";
  static const String charactersWithNumbersRegex = "^([a-z0-9A-Z]+)*\$";

  //static final String charactersNumbersWithSpaceRegex = "^[a-z0-9A-Z]+([a-z0-9A-Z ]+)*\$";
  static const String charactersNumbersWithSpaceRegex = "^([a-z0-9A-Z ]+)*\$";

  //static final String charactersWithSpecialCharacterRegex =  "^[a-z0-9A-Z]+([a-z0-9A-Z!@#%^&*()]+)*\$";   //"^[A-Za-Z!@#%^&*(){}[]_-+*/~`.?<>\$]*\$";
  static const String charactersWithSpecialCharacterRegex = "^([a-z0-9A-Z!@#%^&*.()]+)*\$"; //"^[A-Za-Z!@#%^&*(){}[]_-+*/~`.?<>\$]*\$";

  static const String charactersSpecialCharacterWithSpaceRegex = '^([a-zA-Z-/\'.!@,#%*()\$ ]+)*'; //"^[A-Za-Z!@#%^&*(){}[]_-+*/~`.?<> \$]*\$";

  static const String noneOption = "^[A-Za-Z0-9!@#%^&*(){}[]_-+*/~`.?<> \$]*";

  static const String noneOptionWithOutSpace = "^[A-Za-Z0-9!@#%^&*(){}[]_-+*/~`.?<>\$]*";

  static const String cardExpiryRegex = r'^[0-9/]*';

  static const String decimalNumberRegex = r'^(\d+)?\.?\d{0,2}';
}

TextInputType _getKeyBoardType(TextFieldType type) {
  TextInputType keyBoardType = TextInputType.text;
  if (type == TextFieldType.email) {
    keyBoardType = TextInputType.emailAddress;
  } else if ((type == TextFieldType.phoneNumber) || (type == TextFieldType.cardExpiry)) {
    keyBoardType = TextInputType.phone;
  } else if (type == TextFieldType.price) {
    keyBoardType = const TextInputType.numberWithOptions(decimal: true);
  }
  return keyBoardType;
}

List<TextInputFormatter> _getListOfForamatter(TextFieldType type, int maxLength) {
  List<TextInputFormatter> arrInputFormatter = [];
  // if (type == TextFieldType.usaPhoneNumber) {
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  //   //arrInputFormatter.add(WhitelistingTextInputFormatter(new RegExp(CharacterSetType.usaPhoneNumberRegex)));
  //   arrInputFormatter.add(PhoneNumberTextInputFormatter());
  // }
  // if (type == TextFieldType.decimalNumbers) {
  //   arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.decimalNumberRegex), textType: type, maxLength: maxLength));
  // } else if (type == TextFieldType.card) {
  //   arrInputFormatter.add(FilteringTextInputFormatter.digitsOnly);
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  //   arrInputFormatter.add(HumadityTextInputFormatter());
  // } else if (type == TextFieldType.temprature) {
  //   arrInputFormatter.add(FilteringTextInputFormatter.digitsOnly);
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  //   arrInputFormatter.add(DegreeTextInputFormatter());
  // } else if (type == TextFieldType.humadity) {
  //   arrInputFormatter.add(FilteringTextInputFormatter.digitsOnly);
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  //   arrInputFormatter.add(HumadityTextInputFormatter());
  // }else if (type == TextFieldType.barometer) {
  //   arrInputFormatter.add(FilteringTextInputFormatter.digitsOnly);
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  //   arrInputFormatter.add(BarometerTextInputFormatter());
  // } else {
  //   arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  // }
  if (type == TextFieldType.email) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.emailRegx1), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.password) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.passwordRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.phoneNumber) {
    /*arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.phoneNumberRegx), textType: type, maxLength: maxLength));*/
    /*arrInputFormatter.add(PhoneNumberTextInputFormatter());*/
  } else if (type == TextFieldType.usaPhoneNumber) {
    arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
    //arrInputFormatter.add(WhitelistingTextInputFormatter(new RegExp(CharacterSetType.usaPhoneNumberRegex)));
    arrInputFormatter.add(PhoneNumberTextInputFormatter());
  } else if (type == TextFieldType.name) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.nameRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.nameWithSpace) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.nameWithSpaceRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.userName) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.userNameRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.numericOnly) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.numberOnlyRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.numericWithSpace) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.numericWithSpaceRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.numericNoZero) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.numericNoZeroRegx), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.floatValue) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.floatValueRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersOnly) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersOnlyRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersWithSpace) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersWithSpaceRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersWithNumbers) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersWithNumbersRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersNumbersWithSpace) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersNumbersWithSpaceRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersWithSpecialCharacter) {
    arrInputFormatter
        .add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersWithSpecialCharacterRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.charactersSpecialCharacterWithSpace) {
    arrInputFormatter
        .add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersSpecialCharacterWithSpaceRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.price) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.floatValueRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.none) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.noneOption), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.card) {
    arrInputFormatter.add(FilteringTextInputFormatter.digitsOnly);
    arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
    arrInputFormatter.add(CardNumberInputFormatter());
  } else if (type == TextFieldType.cvv) {
    arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  } else if (type == TextFieldType.zipcode) {
    arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
  } else if (type == TextFieldType.noneNoSpace) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.noneOptionWithOutSpace), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.decimalNumbers) {
    arrInputFormatter.add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.decimalNumberRegex), textType: type, maxLength: maxLength));
  } else if (type == TextFieldType.cardExpiry) {
    arrInputFormatter.add(LengthLimitingTextInputFormatter(maxLength));
    arrInputFormatter.add(CardExpiryTextInputFormatter());
    //arrInputFormatter.add(WhitelistingTextInputFormatter(new RegExp(CharacterSetType.cardExpiryRegex)));
  } else if (type == TextFieldType.searchField) {
    arrInputFormatter
        .add(ValidatorWhitelistingInputFormatter(editingValidator: RegexValidator(regexSource: CharacterSetType.charactersSpecialCharacterWithSpaceRegex), textType: type, maxLength: maxLength));
  }

  return arrInputFormatter;
}

int _getMinLength(TextFieldType type) {
  var minLength = 0;
  if (type == TextFieldType.email) {
    minLength = 2;
  } else if (type == TextFieldType.password) {
    minLength = 6;
  } else if (type == TextFieldType.name) {
    minLength = 2;
  } else if (type == TextFieldType.userName) {
    minLength = 3;
  } else if (type == TextFieldType.phoneNumber) {
    minLength = 8;
  } else if (type == TextFieldType.nameWithSpace) {
    minLength = 2;
  }
  return minLength;
}

int _getMaxLength(TextFieldType type) {
  var maxLength = 2000;
  if (type == TextFieldType.email) {
    maxLength = 50;
  } else if (type == TextFieldType.password) {
    maxLength = 40;
  } else if (type == TextFieldType.name) {
    maxLength = 50;
  } else if (type == TextFieldType.userName) {
    maxLength = 50;
  } else if (type == TextFieldType.phoneNumber) {
    maxLength = 16;
  } else if (type == TextFieldType.usaPhoneNumber) {
    maxLength = 14;
  } else if (type == TextFieldType.price) {
    maxLength = 8;
  } else if (type == TextFieldType.card) {
    maxLength = 16;
  } else if (type == TextFieldType.cvv) {
    maxLength = 3;
  } else if (type == TextFieldType.cardExpiry) {
    maxLength = 5;
  } else if (type == TextFieldType.zipcode) {
    maxLength = 6;
  }
  return maxLength;
}

abstract class StringValidator {
  bool isValid(String value);
}

class RegexValidator implements StringValidator {
  final String? regexSource;
  final String? allowInputsequence;

  RegexValidator({this.regexSource, this.allowInputsequence});

  @override
  bool isValid(String value) {
    try {
      final regex = RegExp(regexSource ?? "");
      final matches = regex.allMatches(value);
      for (Match match in matches) {
        if (match.start == 0 && match.end == value.length) {
          return true;
        }
      }
      return false;
    } catch (e) {
      assert(false, e.toString());
      return true;
    }
  }
}

class ValidatorWhitelistingInputFormatter implements TextInputFormatter {
  final StringValidator? editingValidator;
  final TextFieldType? textType;
  final int? maxLength;

  ValidatorWhitelistingInputFormatter({this.editingValidator, this.textType, this.maxLength});

  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    if (newValue.text.startsWith(" ")) {
      return oldValue;
    }

    //debugPrint("New Text :: ${newValue.text} oldText :: ${oldValue.text} maxLenght :: $maxLength");
    if (newValue.text.length > (maxLength ?? 255)) {
      return oldValue;
    }

    // if no validation then allow alll input
    if (textType == TextFieldType.none) return newValue;

    // Back space always allow
    if ((oldValue.text.length - newValue.text.length) > 0) {
      return newValue;
    }

    if (newValue.text.contains("  ")) {
      return oldValue;
    }

    // code For not allow conssecutive space using regex not possible
    if ((textType != TextFieldType.none) && (newValue.text.isNotEmpty) && (oldValue.text.isNotEmpty)) {
      if ((newValue.text[newValue.text.length - 1] == " ") && (oldValue.text[oldValue.text.length - 1] == " ")) {
        return oldValue;
      } else if ((oldValue.text.length == newValue.text.length) && (oldValue.text[oldValue.text.length - 1] == " " && newValue.text[oldValue.text.length - 1] == ".")) {
        return oldValue;
      }
    }

    // Only for textfield type price
    if (textType == TextFieldType.price) {
      if ((newValue.text.length > oldValue.text.length) && !(newValue.text.contains('.')) && (newValue.text.length > ((maxLength ?? 255) - 3))) {
        return TextEditingValue(
            text: '${oldValue.text}.${newValue.text.substring(newValue.text.length - 1)}',
            selection: TextSelection.collapsed(
              offset: newValue.selection.end + 1,
            ));
      }
    }

    // Means user enter input one by one
    if (((newValue.text.length - oldValue.text.length) == 1)) {
      var updatedString = newValue.text.replaceFirst(oldValue.text, "", 0);
      if (newValue.text.length > 4 && !(textType == TextFieldType.email || textType == TextFieldType.password)) {
        updatedString = newValue.text.substring(newValue.text.length - 4, newValue.text.length);
      }
      final newValueValid = editingValidator!.isValid(updatedString);
      if (newValueValid) {
        return newValue;
      }
      return oldValue;
    }

    //debugPrint("Validation check start");
    final newValueValid = editingValidator!.isValid(newValue.text);
    final oldValueValid = editingValidator!.isValid(oldValue.text);
    //debugPrint("oldValueValid :$oldValueValid  newValueValid :$newValueValid");

    if (!oldValueValid && !newValueValid) {
      return oldValue;
    }

    if (oldValueValid && !newValueValid) {
      if (newValue.text.isEmpty) return newValue;
      return oldValue;
    }
    return newValue;
  }
}

//region Card Expiry Formatter
class CardExpiryTextInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String updatedStr = newValue.text.replaceAll("/", "");

    int usedSubstringIndex = 0;

    final int newTextLength = updatedStr.length;

    final StringBuffer newText = StringBuffer();
    if (newTextLength > 2) {
      newText.write('${updatedStr.substring(0, usedSubstringIndex = 2)}/');
    }
    newText.write(updatedStr.substring(usedSubstringIndex));

    return TextEditingValue(
      text: newText.toString(),
      selection: TextSelection.collapsed(offset: newText.length),
    );
  }
}
//endregion

class HumadityTextInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String updatedStr = newValue.text.replaceAll("%", "");

    int usedSubstringIndex = 0;

    final int newTextLength = updatedStr.length;

    final StringBuffer newText = StringBuffer();

    if (newTextLength >= usedSubstringIndex) {
      // Dump the rest.
      newText.write(updatedStr.substring(usedSubstringIndex));
    }

    int selctionIndex = newValue.selection.start + (newValue.text.length - newText.length).abs();
    selctionIndex = min(selctionIndex, newText.length);
    if (newTextLength >= 1) {
      newText.write('%');
    }
    return TextEditingValue(
      text: newText.toString(),
      selection: TextSelection.collapsed(offset: selctionIndex),
    );
  }
}

class DegreeTextInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String updatedStr = newValue.text.replaceAll(" \u00B0", "");

    int usedSubstringIndex = 0;

    final int newTextLength = updatedStr.length;

    final StringBuffer newText = StringBuffer();

    if (newTextLength >= usedSubstringIndex) {
      // Dump the rest.
      newText.write(updatedStr.substring(usedSubstringIndex));
    }

    int selctionIndex = newValue.selection.start + (newValue.text.length - newText.length).abs();
    selctionIndex = min(selctionIndex, newText.length);
    if (newTextLength >= 1) {
      newText.write(' \u00B0');
    }
    return TextEditingValue(
      text: newText.toString(),
      selection: TextSelection.collapsed(offset: selctionIndex),
    );
  }
}

class BarometerTextInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String updatedStr = newValue.text.replaceAll(" in", "");

    int usedSubstringIndex = 0;

    final int newTextLength = updatedStr.length;

    final StringBuffer newText = StringBuffer();

    if (newTextLength >= usedSubstringIndex) {
      // Dump the rest.
      newText.write(updatedStr.substring(usedSubstringIndex));
    }

    int selctionIndex = newValue.selection.start + (newValue.text.length - newText.length).abs();
    selctionIndex = min(selctionIndex, newText.length);
    if (newTextLength >= 1) {
      newText.write(' in');
    }
    return TextEditingValue(
      text: newText.toString(),
      selection: TextSelection.collapsed(offset: selctionIndex),
    );
  }
}

class CardNumberInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    var text = newValue.text;

    if (newValue.selection.baseOffset == 0) {
      return newValue;
    }

    var buffer = StringBuffer();
    if (text.startsWith(RegExp(r'((34)|(37))'))) {
      for (int i = 0; i < text.length; i++) {
        buffer.write(text[i]);
        var nonZeroIndex = i + 1;
        if (nonZeroIndex == 4 && nonZeroIndex != text.length) {
          buffer.write(' '); // Add spaces.
        } else if (nonZeroIndex == 10 && nonZeroIndex != text.length) {
          buffer.write(' '); // Add spaces.
        }
      }
    } else {
      for (int i = 0; i < text.length; i++) {
        buffer.write(text[i]);
        var nonZeroIndex = i + 1;
        if (nonZeroIndex % 4 == 0 && nonZeroIndex != text.length) {
          buffer.write(' '); // Add spaces.
        }
      }
    }

    var string = buffer.toString();
    return newValue.copyWith(text: string, selection: TextSelection.collapsed(offset: string.length));
  }
}

//region PhoneNumber Formatter
class PhoneNumberTextInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String updatedStr = newValue.text.replaceAll("(", "");
    updatedStr = updatedStr.replaceAll(")", "");
    updatedStr = updatedStr.replaceAll("-", "");
    updatedStr = updatedStr.replaceAll(" ", "");

    int usedSubstringIndex = 0;

    final int newTextLength = updatedStr.length;

    final StringBuffer newText = StringBuffer();
    if (newTextLength >= 1) {
      newText.write('(');
    }
    if (newTextLength >= 4) {
      newText.write('${updatedStr.substring(0, usedSubstringIndex = 3)}) ');
    }
    if (newTextLength >= 7) {
      newText.write('${updatedStr.substring(3, usedSubstringIndex = 6)}-');
    }
    if (newTextLength >= 11) {
      newText.write('${updatedStr.substring(6, usedSubstringIndex = 10)} ');
    }
    if (newTextLength >= usedSubstringIndex) {
      // Dump the rest.
      newText.write(updatedStr.substring(usedSubstringIndex));
    }

    int selctionIndex = newValue.selection.start + (newValue.text.length - newText.length).abs();
    selctionIndex = min(selctionIndex, newText.length);

    return TextEditingValue(
      text: newText.toString(),
      selection: TextSelection.collapsed(offset: selctionIndex),
    );
  }
}

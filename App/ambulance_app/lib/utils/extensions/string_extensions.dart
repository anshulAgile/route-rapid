import 'dart:ui';

extension ValidationExtension on String {
  String smallSentence() {
    if (length > 8) {
      return '${substring(0, 8)}..';
    } else {
      return this;
    }
  }

  String bigSentence() {
    if (length > 30) {
      return '${substring(0, 30)}..';
    } else {
      return this;
    }
  }

  bool isStringValid({int minLength = 3, int maxLength = 250}) {
    if (length < minLength) {
      return false;
    } else if (length > maxLength) {
      return false;
    }
    return true;
  }

  // convertUTCTOLocal({required currentFormat, bool isUTC = false, required String outputFormat}) {
  //   if (isUTC) {
  //     return Jiffy.parse(this, pattern: currentFormat, isUtc: true).toLocal().format(pattern: outputFormat);
  //   } else {
  //     return Jiffy.parse(this, pattern: currentFormat, isUtc: false).format(pattern: outputFormat);
  //   }
  // }

  String convertToPhoneNumber() {
    String updatedStr = replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("/", "");
    return updatedStr;
  }

  String convertToUSAPhoneNumber() {
    if (length == 0) {
      return this;
    }

    if (isNotEmpty && contains('(')) {
      return this;
    }

    String updatedStr = replaceAll("(", "");
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

    return newText.toString();
  }

  String replaceSpaceAndComma() {
    return replaceAll("\$", "").replaceAll(",", "");
  }

  bool videoFormat() {
    if (contains('.mp4') ||
        contains('.mov') ||
        contains('.mkv') ||
        contains('.wmv') ||
        contains('.avi') ||
        contains('.avchd') ||
        contains('.webm') ||
        contains('.html5') ||
        contains('.flv') ||
        contains('.f4v') ||
        contains('.swf')) {
      return true;
    } else {
      return false;
    }
  }

  String commentPlural() {
    if (length > 1) {
      return 'comments';
    } else {
      return 'comment';
    }
  }

  String getMessageOnChatType() {
    if (contains("feed")) {
      return 'Feed';
    } else if (contains("forum")) {
      return 'Forum';
    } else if (contains("media")) {
      return 'Media';
    } else {
      return '';
    }
  }

  Color parseColor() {
    return Color(int.parse(replaceAll("#", "0xFF")));
  }
}

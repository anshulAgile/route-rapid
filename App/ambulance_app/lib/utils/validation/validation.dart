import 'package:ambulance_app/utils/app_common/app_logger.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:ambulance_app/utils/extensions/string_extensions.dart';

enum ValidationType {
  firstName,
  lastName,
  aboutYourself,
  email,
  addProfile,
  password,
  signUpPassword,
  confirmPassword,
  phoneNumber,
  inviteCode,
  termsAndConditions,
  otp,
  city,
  state,
  birthdate,
  dropDownCompany,
  company,
  position,
  experience,
  bio,
  address,
  zipCode,
  description,
  website,
  companyName,
  shortcutType,
  shortcutname,
  suggestionDropdownSelection,
  suggestion,
  none
}

class Validation {
  factory Validation() {
    return _singleton;
  }

  static final Validation _singleton = Validation._internal();

  Validation._internal() {
    Logger().v("Instance created Validation");
  }

  Tuple2<bool, String> validateFirstName(String value) {
    String errorMessage = '';
    if (value.isEmpty) {
      errorMessage = StringConstant.blankFirstName;
    } else if (!value.isStringValid()) {
      errorMessage = StringConstant.validateFirstName;
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple2<bool, String> validateLastName(String value) {
    String errorMessage = '';

    if (value.isEmpty) {
      errorMessage = StringConstant.blankLastName;
    } else if (!value.isStringValid()) {
      errorMessage = StringConstant.validateLastName;
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple2<bool, String> validateEmail(String value) {
    String errorMessage = '';

    if (value.isEmpty) {
      errorMessage = StringConstant.blankEmail;
    } else if (!value.isStringValid() || !value.isEmail) {
      errorMessage = StringConstant.validateEmail;
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple2<bool, String> validatePassword(String value) {
    String errorMessage = '';
    if (value.isEmpty) {
      errorMessage = StringConstant.blankPassword;
    } else if (!value.isStringValid(minLength: 8, maxLength: 16)) {
      errorMessage = StringConstant.validatePassword;
    } else {
      return Tuple2(errorMessage.isEmpty, errorMessage);
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple2<bool, String> validateConfirmPassword(String password, String confirmPassword) {
    String errorMessage = '';

    if (confirmPassword.isEmpty) {
      errorMessage = StringConstant.blankConfirmPassword;
    } else if (password != confirmPassword) {
      errorMessage = StringConstant.validateConfirmPassword;
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple2<bool, String> validatePhoneNumber(String value) {
    String errorMessage = '';
    if (!value.isStringValid(minLength: 10)) {
      errorMessage = StringConstant.validateMobileNo;
    }
    return Tuple2(errorMessage.isEmpty, errorMessage);
  }

  Tuple3<bool, String, ValidationType> checkValidationForTextFieldWithType({List<Tuple2<ValidationType, String>>? list}) {
    Tuple3<bool, String, ValidationType> isValid = const Tuple3(true, '', ValidationType.none);

    for (Tuple2<ValidationType, String> textOption in list ?? []) {
      if (textOption.item1 == ValidationType.firstName) {
        final res = validateFirstName(textOption.item2);
        isValid = Tuple3(res.item1, res.item2, ValidationType.firstName);
      } else if (textOption.item1 == ValidationType.lastName) {
        final res = validateLastName(textOption.item2);
        isValid = Tuple3(res.item1, res.item2, ValidationType.lastName);
      } else if (textOption.item1 == ValidationType.email) {
        final res = validateEmail(textOption.item2);
        isValid = Tuple3(res.item1, res.item2, ValidationType.email);
      } else if (textOption.item1 == ValidationType.password) {
        final res = validatePassword(textOption.item2);
        isValid = Tuple3(res.item1, res.item2, ValidationType.password);
      } else if (textOption.item1 == ValidationType.phoneNumber) {
        final res = validatePhoneNumber(textOption.item2);
        isValid = Tuple3(res.item1, res.item2, ValidationType.phoneNumber);
      }

      if (!isValid.item1) {
        break;
      }
    }
    return isValid;
  }
}

import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:google_places_picker/google_places_picker.dart';

import '../export_utils.dart';

const defaultFetchLimit = 20;

/// tap to unfocus / closed key board
class CommonUtils {
  static Widget commonNoRecordFoundWidget({required String message, Color? fontColor}) {
    return Center(
        child: Text(
      message,
      style: AppTextStyle.setTS(fontFamily: AppFont.metropolisSemiBold600, color: fontColor ?? AppColors.primaryColor, fontSize: 19),
    ));
  }

  static void scopeUnFocus(BuildContext context) {
    FocusScopeNode currentFocus = FocusScope.of(context);
    if (!currentFocus.hasPrimaryFocus) {
      currentFocus.unfocus();
    }
  }

  static String convertToPhoneNumber({required String updatedStr}) {
    String newText = updatedStr.replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("/", "");
    return newText;
  }

  static telePhoneUrl(String phone) {
    // launchUrl(phoneUrl);
  }

  static mapCompanyDirection({required String latitude, required String longitude}) async {
    // if (await canLaunchUrl(uri)) {
    //   await launchUrl(uri);
    // } else {
    //   throw 'Could not launch $uri';
    // }
  }

  static Future<Map<String, dynamic>> getDataFromJsonEnvironment() async {
    String data = await rootBundle.loadString("assets/env.json");
    final jsonResult = jsonDecode(data);
    if (jsonResult != null) {
      return Future.value(jsonResult as Map<String, dynamic>);
    } else {
      return Future.value({});
    }
  }

  static Future<void> openPlacePicker({TypeFilter? typeFilter, required ValueChanged<Place> onSuccess, required VoidCallback onError}) async {
    //companySettingController.addressTextController.clear();
    Place place = await PluginGooglePlacePicker.showAutocomplete(mode: PlaceAutocompleteMode.MODE_OVERLAY, countryCode: "US", typeFilter: typeFilter);

    if (place.address != null) {
      onSuccess(place);
    } else {
      onError();
    }
  }
}

class NumberFormatter {
  static getShortForm(int number) {
    var shortForm = "";
    if (number < 1000) {
      shortForm = number.toString();
    } else if (number >= 1000 && number < 1000000) {
      shortForm = "${(number / 1000).toStringAsFixed(0)}k";
    } else if (number >= 1000000 && number < 1000000000) {
      shortForm = "${(number / 1000000).toStringAsFixed(1)}M";
    } else if (number >= 1000000000 && number < 1000000000000) {
      shortForm = "${(number / 1000000000).toStringAsFixed(1)}B";
    }
    return shortForm;
  }
}

String generateRandomString(int len) {
  var r = Random();
  return String.fromCharCodes(List.generate(len, (index) => r.nextInt(33) + 89));
}

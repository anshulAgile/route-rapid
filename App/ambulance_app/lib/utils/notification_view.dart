import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:ambulance_app/utils/app_common/app_images.dart';
import 'package:ambulance_app/utils/export_utils.dart';

typedef NotificationOViewCallback = void Function(bool status);

class NotificationView extends StatelessWidget {
  final String title;
  final String subTitle;
  final NotificationOViewCallback? onTap;

  const NotificationView({Key? key, this.title = "", this.subTitle = "", this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: GestureDetector(
        child: SafeArea(
          bottom: false,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.0),
              color: AppColors.whiteColor,
              boxShadow: kElevationToShadow[1],
            ),
            margin: const EdgeInsets.all(10.0),
            width: double.infinity,
            child: Container(
              padding: const EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                color: AppColors.whiteColor,
                boxShadow: kElevationToShadow[1],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4.0),
                        child: Image.asset(
                          AppImages.add_profile,
                          width: 20.w,
                          height: 20.w,
                        ),
                      ),
                      SizedBox(
                        width: 6.w,
                      ),
                      Text(
                        StringConstant.appName,
                        style: AppTextStyle.setTS(fontSize: 15, fontFamily: AppFont.metropolisSemiBold600, color: AppColors.blackColor),
                      ),
                    ],
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      top: 6.h,
                    ),
                  ),
                  Text(
                    title,
                    style: AppTextStyle.setTS(fontSize: 13, fontFamily: AppFont.metropolisMedium500, color: AppColors.blackColor),
                  ),
                  const Padding(padding: EdgeInsets.only(top: 6)),
                  Text(
                    subTitle,
                    style: AppTextStyle.setTS(fontSize: 12, fontFamily: AppFont.metropolisRegular400, color: AppColors.blackColor),
                    maxLines: 3,
                  ),
                ],
              ),
            ),
          ),
        ),
        onTap: () {
          if (onTap != null) {
            onTap!(true);
          }
        },
      ),
    );
  }
}

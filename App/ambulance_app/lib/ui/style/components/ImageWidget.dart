// ignore_for_file: file_names

import 'package:ambulance_app/utils/app_common/app_colors.dart';
import 'package:ambulance_app/utils/app_common/app_images.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';

class ImageWidget extends StatelessWidget {
  final String? url;
  final String? placeholder;
  final String? errorPlaceHolderImage;
  final BoxFit? fit;
  final double? height;
  final double? width;
  final bool? placeHolderOnboarding;
  final bool isOriginalImage;
  final bool? isGoatDefaultImage;

  const ImageWidget(
      {Key? key,
      this.url,
      this.placeholder,
      this.placeHolderOnboarding,
      this.isGoatDefaultImage,
      this.fit,
      this.height,
      this.width,
      this.errorPlaceHolderImage,
      this.isOriginalImage = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    if ((url ?? '').isEmpty && isGoatDefaultImage == true) {
      if ((AppImages.defaultImg).isEmpty) return Container();
      return Image.asset(
        AppImages.defaultImg,
        height: height,
        width: width,
        fit: fit ?? BoxFit.contain,
      );
    }

    if ((url ?? '').isEmpty) {
      if ((placeholder ?? AppImages.image_placeholder).isEmpty) return Container();
      return Image.asset(
        placeholder ?? AppImages.image_placeholder,
        height: height,
        width: width,
        fit: fit ?? BoxFit.cover,
      );
    }

    if (!(url!.startsWith("http") || url!.startsWith("https"))) {
      return Image.asset(
        errorPlaceHolderImage ?? AppImages.errorImage,
        height: height,
        width: width,
        fit: fit ?? BoxFit.cover,
      );
    }

    return CachedNetworkImage(
        imageUrl: url ?? "",
        height: height,
        width: width,
        // memCacheHeight: isOriginalImage == false ? 400 : null,
        // memCacheWidth: isOriginalImage == false ? 400 : null,
        // cacheManager: LocalCacheManager.instance,
        maxHeightDiskCache: isOriginalImage == false ? 1024 : null,
        maxWidthDiskCache: isOriginalImage == false ? 1024 : null,
        fit: fit ?? BoxFit.cover,
        placeholder: (context, url) {
          if (placeHolderOnboarding ?? false) {
            return const Center(
                child: CupertinoActivityIndicator(
              color: AppColors.whiteColor,
            ));
          } else {
            return Image.asset(
              placeholder ?? AppImages.image_placeholder,
              height: height,
              width: width,
              fit: fit ?? BoxFit.cover,
            );
          }
        },
        errorWidget: (context, url, error) {
          return Image.asset(
            errorPlaceHolderImage ?? AppImages.errorImage,
            height: height,
            width: width,
            fit: fit ?? BoxFit.cover,
          );
        });
  }
}

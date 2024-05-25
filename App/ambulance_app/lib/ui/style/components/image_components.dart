import 'dart:io';

import 'package:ambulance_app/ui/style/components/ImageWidget.dart';
import 'package:ambulance_app/utils/export_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';

class ImageComponent {
  static Widget loadLocalImage({
    required String imageName,
    double? height,
    double? width,
    Color? imageColor,
    BoxFit? fit,
  }) {
    return Image.asset(
      imageName,
      width: width,
      height: height,
      color: imageColor,
      fit: fit,
    );
  }

  static circleNetworkImage(
      {required String imageUrl, double? height, double? width, double? radius, BoxFit? fit, bool? isGoatDefaultImage, String? placeholder}) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(radius ?? ((height ?? 0.0) / 2)),
      child: SizedBox(
          height: height ?? 0.0,
          width: width ?? 0.0,
          child: ImageWidget(
            url: imageUrl,
            height: height,
            width: width,
            fit: fit,
            placeholder: placeholder,
            isGoatDefaultImage: isGoatDefaultImage,
            errorPlaceHolderImage: placeholder,
          )),
    );
  }

  static Widget loadNetworkImage({
    String? url,
    double? height,
    double? width,
    BoxFit? boxFit,
    Color? color,
    required double borderRadius,
    String? placeholder,
  }) {
    if ((url ?? '').isEmpty) {
      if ((placeholder ?? '').isEmpty) return const Icon(Icons.error);
      return loadLocalImage(
        imageName: placeholder ?? "",
        height: height,
        width: width,
        fit: boxFit ?? BoxFit.cover,
      );
    }
    if (!(url!.startsWith("http") || url.startsWith("https"))) {
      return Image.file(
        File(url),
        fit: boxFit ?? BoxFit.cover,
      );
    }
    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: CachedNetworkImage(
        imageUrl: url,
        placeholder: placeholder != null
            ? (context, url) => Center(
                  child: loadLocalImage(
                    imageName: placeholder,
                    height: height ?? 30,
                    width: width ?? 30,
                    fit: boxFit ?? BoxFit.contain,
                  ),
                )
            : (context, url) => const Center(
                  child: CircularProgressIndicator(),
                ),
        errorWidget: (context, url, error) => loadLocalImage(
          imageName: placeholder ?? "",
          height: height,
          width: width,
          fit: boxFit ?? BoxFit.cover,
        ),
        fit: boxFit,
        height: height,
        width: width,
        color: color,
      ),
    );
  }
}

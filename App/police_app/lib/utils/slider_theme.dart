import 'dart:ui' as ui;

import 'export_utils.dart';

class SliderThumbImage extends SliderComponentShape {
  final ui.Image image;

  SliderThumbImage(this.image);

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) {
    return const Size(1, -1);
  }

  @override
  void paint(PaintingContext context, Offset center,
      {required Animation<double> activationAnimation,
      required Animation<double> enableAnimation,
      required bool isDiscrete,
      required TextPainter labelPainter,
      required RenderBox parentBox,
      required SliderThemeData sliderTheme,
      required TextDirection textDirection,
      required double value,
      required double textScaleFactor,
      required Size sizeWithOverflow}) {
    final canvas = context.canvas;
    final imageWidth = image.width;
    final imageHeight = image.height;

    Offset imageOffset = Offset(
      center.dx - (imageWidth / 2),
      center.dy - (imageHeight / 2),
    );

    Paint paint = Paint()..filterQuality = FilterQuality.high;

    canvas.drawImage(image, imageOffset, paint);
  }
}

class DoubleContainerSliderThumbCircle extends SliderComponentShape {
  final double thumbRadius;
  final Color outerThumbColor;
  final Color innerThumbColor;
  final double elevation;

  const DoubleContainerSliderThumbCircle({
    required this.thumbRadius,
    required this.outerThumbColor,
    required this.innerThumbColor,
    required this.elevation,
  });

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) {
    return Size.fromRadius(thumbRadius);
  }

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    required bool isDiscrete,
    required TextPainter labelPainter,
    required RenderBox parentBox,
    required SliderThemeData sliderTheme,
    required TextDirection textDirection,
    required double value,
    required double textScaleFactor,
    required Size sizeWithOverflow,
  }) {
    final Canvas canvas = context.canvas;

    final outerThumbPaint = Paint()..color = outerThumbColor;
    final innerThumbPaint = Paint()..color = innerThumbColor;

    final centerOffset = Offset(center.dx, center.dy);

    final shadowPaint = Paint()
      ..color = Colors.black.withOpacity(0.3)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, elevation);

    canvas.drawCircle(centerOffset, thumbRadius, shadowPaint);
    canvas.drawCircle(centerOffset, thumbRadius, outerThumbPaint);

    final innerThumbRadius = thumbRadius - 4;
    canvas.drawCircle(centerOffset, innerThumbRadius, innerThumbPaint);
  }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $content['seo']['meta_title'] ?? $product }}</title>
    <meta name="description" content="{{ $content['seo']['meta_description'] ?? '' }}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            margin: 0;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body>
    @if($template === 'minimalist')
        @include('exports.templates.minimalist', ['c' => $content])
    @elseif($template === 'corporate')
        @include('exports.templates.corporate', ['c' => $content])
    @elseif($template === 'high-energy')
        @include('exports.templates.high-energy', ['c' => $content])
    @endif
</body>
</html>
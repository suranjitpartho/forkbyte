<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXUS.DEV | Modern Web Development</title>

    <!-- Alpine.js -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js" defer></script>
    <!-- Alpine Data -->
    <script src="js/alpine-data.js"></script>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Tailwind Config -->
    <script src="js/tailwind.config.js"></script>

    <!-- Google Fonts: Barlow -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="css/style.css">
</head>

<body x-data="layout" class="selection:bg-[#30e9bb]/30 selection:text-[#30e9bb]">

    <!-- Ambient Background Glows -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <!-- Grid Overlay -->
        <div class="absolute inset-0 opacity-[0.03] grid-pattern"></div>

        <!-- 3D Background Canvas -->
        <canvas id="three-canvas" class="absolute inset-0 w-full h-full opacity-60"></canvas>
    </div>

    <?php include 'components/header.blade.html'; ?>

    <?php include 'components/hero.blade.html'; ?>

    <?php include 'components/stats.blade.html'; ?>

    <?php include 'components/services.blade.html'; ?>

    <?php include 'components/work.blade.html'; ?>

    <?php include 'components/technologies.blade.html'; ?>

    <?php include 'components/process.blade.html'; ?>

    <?php include 'components/footer.blade.html'; ?>

    <!-- Three.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <!-- 3D Background Script -->
    <script src="js/three-background.js"></script>
</body>

</html>
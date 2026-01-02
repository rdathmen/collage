<?php
$dir = __DIR__;
$files = scandir($dir);

$replacements = [
    'الألدهيدات_والكيتونات.html' => 'aldehydes_and_ketones.html',
    'الألكاينات.html' => 'alkynes.html',
    'الألكينات.html' => 'alkenes.html',
    'الأمينات.html' => 'amines.html',
    'الالكانات.html' => 'alkanes.html',
    'الايثرات.html' => 'ethers.html',
    'الكحولات.html' => 'alcohols.html',
    'النترو_مركبات.html' => 'nitro_compounds.html',
    'من_نحن.html' => 'about_us.html',
    'هاليدات_الاكيل.html' => 'alkyl_halides.html'
];

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
        $content = file_get_contents($dir . '/' . $file);
        $newContent = str_replace(array_keys($replacements), array_values($replacements), $content);
        
        // Also fix the specific cards.php mismatch if it exists in any static files (unlikely but good to check)
        $newContent = str_replace('aldehydes_ketones.html', 'aldehydes_and_ketones.html', $newContent);

        if ($content !== $newContent) {
            file_put_contents($dir . '/' . $file, $newContent);
            echo "Updated $file\n";
        }
    }
}
echo "Done.";
?>

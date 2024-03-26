# Check if folder exists
if (-not (Test-Path "AdLerDokumentation/Writerside/topics" -PathType Container)) {
  Write-Output "Folder 'AdLerDokumentation/Writerside/topics' does not exist."
  exit 1
}

# Check if shorthand is provided as argument
if ($args.Count -eq 0) {
  Write-Output "Usage: $PSCommandPath <shorthand>"
  exit 1
}

$shorthand = $args[0]
$folder = "AdLerDokumentation/Writerside/topics"

# Find all files with the given shorthand
$files = Get-ChildItem -Path $folder -Filter "$shorthand*.md" | Sort-Object Name

# Extract the numbers from the files
$numbers = $files.Name -replace "^$shorthand(\d+)\.md$", '$1'

# Find the first gap in the sequence
$gap = 1
foreach ($number in $numbers) {
  $number = $number -replace '^0+', ''
  if ($number -ne $gap) {
    break
  }
  $gap++
}

# Format the file name with the gap
$next_file = "{0}{1:D4}.md" -f $shorthand, $gap

Write-Output $next_file

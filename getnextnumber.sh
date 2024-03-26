#!/bin/sh

# Check if folder exists
if [ ! -d "AdLerDokumentation/Writerside/topics" ]; then
  echo "Folder 'AdLerDokumentation/Writerside/topics' does not exist."
  exit 1
fi

# Check if shorthand is provided as argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 <shorthand>"
  exit 1
fi

shorthand="$1"
folder="AdLerDokumentation/Writerside/topics"

# Find all files with the given shorthand
files=$(ls -1 "$folder" | grep "^$shorthand[0-9]*\.md$" | sort)

# Extract the numbers from the files
numbers=$(echo "$files" | sed "s/^$shorthand\([0-9]*\)\.md$/\1/")

# Find the first gap in the sequence
gap=1
for number in $numbers; do
  if [ "$number" -ne "$gap" ]; then
    break
  fi
  gap=$((gap + 1))
done

# Format the file name with the gap
next_file="${shorthand}$(printf '%04d' "$gap").md"

echo "$next_file"

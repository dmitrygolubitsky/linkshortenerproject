#!/usr/bin/env bash
# Super Mario runs across the terminal from left to right, then the script exits.

W=12          # sprite width in pixels (each pixel = 2 terminal cells)
H=16          # sprite height in pixels
STEP=2        # cells moved per frame
DELAY=0.04

FRAME_A=(
"....RRRRR..."
"...RRRRRRRRR"
"...BBBSSBS.."
"..BSBSSSBSSS"
"..BSBBSSSBSS"
"..BBSSSSBBBB"
"....SSSSSSS."
"...RRURRR..."
"..RRRURRURRR"
".RRRRUUUURRR"
"SSRUYUUYURSS"
"SSSUUUUUUSSS"
"SSUUUUUUUUSS"
"..UUU..UUU.."
".BBB....BBB."
"BBBB....BBBB"
)

FRAME_B=(
"....RRRRR..."
"...RRRRRRRRR"
"...BBBSSBS.."
"..BSBSSSBSSS"
"..BSBBSSSBSS"
"..BBSSSSBBBB"
"....SSSSSSS."
"...RRURRR..."
"..RRRURRURRR"
".RRRRUUUURRR"
"SSRUYUUYURSS"
"SSSUUUUUUSSS"
"SSUUUUUUUUSS"
"...UUUUUU..."
"...BBBBBB..."
"..BBBBBBBB.."
)

ESC=$'\033'
set_color() {  # sets $COLOR to the ANSI background escape for pixel code $1
  case "$1" in
    R) COLOR="${ESC}[48;5;196m" ;;
    B) COLOR="${ESC}[48;5;94m"  ;;
    S) COLOR="${ESC}[48;5;216m" ;;
    U) COLOR="${ESC}[48;5;27m"  ;;
    Y) COLOR="${ESC}[48;5;226m" ;;
    *) COLOR="${ESC}[49m"       ;;
  esac
}

cleanup() {
  printf '\033[0m\033[?25h\033[?1049l'
}
trap cleanup EXIT
trap 'exit 130' INT TERM

cols=$(tput cols 2>/dev/null || echo 80)
rows=$(tput lines 2>/dev/null || echo 24)
if (( rows < H + 4 )); then
  echo "Terminal too small: need at least $((H + 4)) rows." >&2
  exit 1
fi

top=$(( rows - H - 2 ))   # first screen row (0-based) of the sprite; 2 ground rows below

printf '\033[?1049h\033[?25l\033[2J'

# Ground
for g in 0 1; do
  printf '\033[%d;1H' $(( top + H + g + 1 ))
  line=""
  for (( c = 0; c < cols; c++ )); do
    if (( (c / 4 + g) % 2 == 0 )); then line+="\033[48;5;130m "; else line+="\033[48;5;94m "; fi
  done
  printf "${line}\033[0m"
done

x=$(( -W * 2 ))
n=0
while (( x < cols )); do
  if (( (n / 3) % 2 == 0 )); then sprite=("${FRAME_A[@]}"); else sprite=("${FRAME_B[@]}"); fi

  out=""
  for (( r = 0; r < H; r++ )); do
    row=${sprite[r]}
    first=1
    # p = -1 is a blank column that erases the previous frame's trail
    for (( p = -1; p < W; p++ )); do
      if (( p < 0 )); then ch="."; else ch=${row:p:1}; fi
      for (( k = 0; k < 2; k++ )); do
        cell=$(( x + 2 * p + k ))
        (( cell < 0 || cell >= cols )) && continue
        if (( first )); then out+="${ESC}[$(( top + r + 1 ));$(( cell + 1 ))H"; first=0; fi
        set_color "$ch"
        out+="$COLOR "
      done
    done
  done
  printf '%s\033[0m' "$out"

  sleep "$DELAY"
  x=$(( x + STEP ))
  n=$(( n + 1 ))
done

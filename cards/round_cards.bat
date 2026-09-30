@echo off
cd /d "%~dp0"

echo Kaarten worden verwerkt...
echo.

python "round_cards.py"

echo.
pause
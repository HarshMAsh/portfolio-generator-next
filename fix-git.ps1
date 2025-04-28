# Fix Git setup script

# Check if Git is already in the PATH
$gitInPath = $null -ne (Get-Command git -ErrorAction SilentlyContinue)

if (-not $gitInPath) {
    Write-Host "Git is not in PATH. Adding it now..."
    
    # Common Git installation locations
    $gitPaths = @(
        "C:\Program Files\Git\cmd",
        "C:\Program Files\Git\bin",
        "C:\Program Files (x86)\Git\cmd",
        "C:\Program Files (x86)\Git\bin"
    )
    
    $gitFound = $false
    
    foreach ($path in $gitPaths) {
        if (Test-Path "$path\git.exe") {
            Write-Host "Found Git at $path"
            $env:Path += ";$path"
            $gitFound = $true
            break
        }
    }
    
    if ($gitFound) {
        Write-Host "Git has been added to PATH for this session"
        
        # Verify Git is working
        try {
            $gitVersion = & git --version
            Write-Host "Git is now working: $gitVersion"
        } catch {
            Write-Host "Error running Git. Please try restarting PowerShell."
        }
        
        # Ask if user wants to add Git to PATH permanently
        $addPermanently = Read-Host "Would you like to add Git to PATH permanently? (y/n)"
        if ($addPermanently -eq "y") {
            $userPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
            $userPath += ";$path"
            [Environment]::SetEnvironmentVariable("Path", $userPath, [EnvironmentVariableTarget]::User)
            Write-Host "Git has been added to your user PATH permanently"
        }
    } else {
        Write-Host "Could not find Git executable. Please install Git for Windows."
        Write-Host "You can download it from: https://gitforwindows.org/"
    }
} else {
    $gitVersion = & git --version
    Write-Host "Git is already in your PATH and working: $gitVersion"
} 
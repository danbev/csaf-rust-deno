# Source Spack so that we can switch to use gcc@12.1.0
. ~/work/linux/spack/share/spack/setup-env.sh
spack load gcc@12.1.0
gcc --version

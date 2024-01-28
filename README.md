# Quick Stop Assesment

Deno app 🦕 created for assesment by Quick Stop

## Running the APP
1. Ensure Deno is installed on your computer system. The below commands can be used:
    - Windows (using winget):
        ```console
        winget install deno
        ```
        - Manual installation can be done by downloading the zip file: https://github.com/denoland/deno/releases
    - Linux:
        ```console
        curl -fsSL https://deno.land/install.sh | sh
        ```

2. Navigate to the project root directory:
    - Create a .env file in the root (The same variables from the env.example can be applied)
    - Optionally, you can create a log folder in the root. The app will create it automatically if not found


3. Once this is done you can use the below to run the application:

```console
deno task runQslApp
```

### Optional
1. You can also create binary executables to run independently on your PC using the commands below:

    Windows
    ```console
    deno task compileWindows
    ```

    Linux
    ```console
    deno task compileLinux
    ```

    The binary will be added to the root directory


2. You can also download the already built binaries using the link below:
    - https://drive.google.com/file/d/1Ni3Rj-ABbyYHlp40jWtbOREKVi6txxvf/view?usp=drive_link

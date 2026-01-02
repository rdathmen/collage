<?php
session_start();
include "../DataBase/db_conn.php";

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])) {
    function validate($data){
       $data = trim($data);
       $data = stripslashes($data);
       $data = htmlspecialchars($data);
       return $data;
    }

    $uname = validate($_POST['username']);
    $pass = validate($_POST['password']);
    $email = validate($_POST['email']);

    if (empty($uname)) {
        header("Location: register.php?error=اسم المستخدم مطلوب");
        exit();
    }else if(empty($pass)){
        header("Location: register.php?error=كلمة المرور مطلوبة");
        exit();
    }else if(empty($email)){
        header("Location: register.php?error=البريد الإلكتروني مطلوب");
        exit();
    }else{
        // Password stored as plain text (NOT RECOMMENDED for production)

        $sql = "SELECT * FROM users WHERE username='$uname' OR email='$email'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            header("Location: register.php?error=اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل");
            exit();
        }else {
            $sql2 = "INSERT INTO users(username, email, password) VALUES('$uname', '$email', '$pass')";
            $result2 = mysqli_query($conn, $sql2);
            if ($result2) {
                header("Location: register.php?success=تم إنشاء الحساب بنجاح");
                exit();
            }else {
                header("Location: register.php?error=حدث خطأ غير معروف");
                exit();
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء حساب - الكيمياء العضوية</title>
    <script src="../js/tailwindcss.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    </style>
     <script src="../js/theme.js"></script>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center min-h-screen">

    <div class="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
                إنشاء حساب جديد
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                انضم إلينا لاستكشاف عالم الكيمياء العضوية
            </p>
        </div>

        <form class="mt-8 space-y-6" action="register.php" method="post">
            <?php if (isset($_GET['error'])) { ?>
                <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <?php echo $_GET['error']; ?>
                </div>
            <?php } ?>
            <?php if (isset($_GET['success'])) { ?>
                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <?php echo $_GET['success']; ?>
                </div>
            <?php } ?>

            <div class="rounded-md shadow-sm -space-y-px">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم المستخدم</label>
                    <input id="username" name="username" type="text" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="اسم المستخدم">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                    <input id="email" name="email" type="email" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="example@email.com">
                </div>
                <div>
                     <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
                    <input id="password" name="password" type="password" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="••••••••">
                </div>
            </div>

            <div>
                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                    إنشاء حساب
                </button>
            </div>
            
            <div class="flex items-center justify-center">
                <div class="text-sm">
                    <a href="login.php" class="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
                        لدي حساب بالفعل؟ تسجيل الدخول
                    </a>
                </div>
            </div>
             <div class="flex items-center justify-center mt-4">
                <div class="text-sm">
                    <a href="../index.php" class="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                         العودة للرئيسية
                    </a>
                </div>
            </div>
        </form>
    </div>
</body>
</html>

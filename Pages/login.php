<?php
session_start();
include "../db_conn.php";

if (isset($_POST['uname']) && isset($_POST['password'])) {
    function validate($data){
       $data = trim($data);
       $data = stripslashes($data);
       $data = htmlspecialchars($data);
       return $data;
    }

    $uname = validate($_POST['uname']);
    $pass = validate($_POST['password']);

    if (empty($uname)) {
        header("Location: login.php?error=اسم المستخدم مطلوب");
        exit();
    }else if(empty($pass)){
        header("Location: login.php?error=كلمة المرور مطلوبة");
        exit();
    }else{
        $sql = "SELECT * FROM users WHERE username='$uname' OR email='$uname'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            // Direct password comparison (NOT RECOMMENDED for production)
            if ($pass === $row['password']) {
                $_SESSION['user_name'] = $row['username'];
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['name'] = $row['username'];
                $_SESSION['id'] = $row['id'];
                header("Location: ../index.php");
                exit();
            }else{
                header("Location: login.php?error=اسم المستخدم أو كلمة المرور غير صحيحة");
                exit();
            }
        }else{
            header("Location: login.php?error=اسم المستخدم أو كلمة المرور غير صحيحة");
            exit();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول - الكيمياء العضوية</title>
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
                تسجيل الدخول
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                مرحباً بعودتك!
            </p>
        </div>

        <form class="mt-8 space-y-6" action="login.php" method="post">
            <?php if (isset($_GET['error'])) { ?>
                <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <?php echo $_GET['error']; ?>
                </div>
            <?php } ?>

            <div class="rounded-md shadow-sm -space-y-px">
                <div class="mb-4">
                    <label for="uname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم المستخدم أو البريد الإلكتروني</label>
                    <input id="uname" name="uname" type="text" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="اسم المستخدم أو البريد الإلكتروني">
                </div>
                <div>
                     <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
                    <input id="password" name="password" type="password" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="••••••••">
                </div>
            </div>

            <div>
                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                    تسجيل الدخول
                </button>
            </div>

            <div class="flex items-center justify-center">
                <div class="text-sm">
                    <a href="register.php" class="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
                        ليس لديك حساب؟ إنشاء حساب جديد
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

$(document).ready(function() {
    // Initialize localStorage if empty
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showWelcomePage(loggedInUser);
    }

    // Show/Hide Forms
    $('#showRegister').click(function() {
        $('.form-container').hide();
        $('#registerForm').show();
    });

    $('#showLogin, .backToLogin').click(function() {
        $('.form-container').hide();
        $('#loginForm').show();
    });

    $('#showChangePassword').click(function() {
        $('.form-container').hide();
        $('#changePasswordForm').show();
    });

    $('#showDeleteAccount').click(function() {
        $('.form-container').hide();
        $('#deleteAccountForm').show();
    });

    // Register
    $('#registerBtn').click(function(e) {
        e.preventDefault();
        
        const userData = {
            username: $('#regUsername').val(),
            password: $('#regPassword').val(),
            email: $('#regEmail').val()
        };

        let users = JSON.parse(localStorage.getItem('users'));
        
        // Check if username exists
        if (users.find(u => u.username === userData.username)) {
            $('#registerAlert').show();
            setTimeout(() => $('#registerAlert').hide(), 3000);
            return;
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        $('#showLogin').click();
    });

    // Login
    $('#loginBtn').click(function(e) {
        e.preventDefault();
        
        const username = $('#loginUsername').val();
        const password = $('#loginPassword').val();

        let users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('loggedInUser ', username);
            showWelcomePage(username);
            $('#loginAlert').removeClass('alert-danger').addClass('alert-success').text("You will be directed to the app").show();
        
            setTimeout(() => {
                window.location.href = '../Wspend-app/index.html';
            }, 2000);
            
        } else {
            $('#loginAlert').show();
            setTimeout(() => $('#loginAlert').hide(), 3000);
        }
    });

    // Show Welcome Page
    function showWelcomePage(username) {
        $('.form-container').hide();
        $('#welcomePage').show();
        $('#welcomeUsername').text(username);
    }

    // Logout
    $('#logoutBtn').click(function() {
        localStorage.removeItem('loggedInUser ');
        $('#showLogin').click();
    });

    // Change Password
    $('#changePasswordBtn').click(function(e) {
        e.preventDefault();
        
        const username = $('#changeUsername').val();
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();

        let users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === username && u.password === currentPassword);
        
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Password changed successfully!');
            $('#showLogin').click();
        } else {
            $('#changePasswordAlert').show();
            setTimeout(() => $('#changePasswordAlert').hide(), 3000);
        }
    });

    // Delete Account
    $('#deleteAccountBtn').click(function(e) {
        e.preventDefault();
        
        const username = $('#deleteUsername').val();
        const password = $('#deletePassword').val();

        let users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === username && u.password === password);
        
        if (userIndex !== -1) {
            if (confirm('Are you sure you want to delete your account?')) {
                users.splice(userIndex, 1);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Account deleted successfully!');
                $('#showLogin').click();
            }
        } else {
            $('#deleteAccountAlert').show();
            setTimeout(() => $('#deleteAccountAlert').hide(), 3000);
        }
    });
});
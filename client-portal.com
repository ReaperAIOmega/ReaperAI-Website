<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Johnson Strategic Solutions | Client Portal</title>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(rgba(5,10,20,0.9), rgba(5,10,20,0.96)),
                url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80");
    background-size: cover;
    background-position: center;
    color: white;
}

.navbar {
    background: rgba(10,15,25,0.95);
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.logo {
    font-size: 20px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.nav-links a {
    color: #7fb8ff;
    text-decoration: none;
    font-weight: bold;
}

.hero {
    max-width: 1100px;
    margin: 70px auto 30px;
    padding: 0 20px;
    text-align: center;
}

.hero h1 {
    font-size: 42px;
    margin-bottom: 12px;
}

.hero p {
    color: #d5e7ff;
    font-size: 18px;
    max-width: 760px;
    margin: 0 auto;
    line-height: 1.6;
}

.portal-grid {
    max-width: 1100px;
    margin: 30px auto 80px;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
}

.card {
    background: rgba(12,18,30,0.9);
    padding: 26px;
    border-radius: 14px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.45);
    border: 1px solid rgba(77,166,255,0.12);
}

.card h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 24px;
}

.card p {
    color: #d7e6ff;
    line-height: 1.6;
    margin-bottom: 18px;
}

.button {
    display: inline-block;
    background: linear-gradient(135deg,#4da6ff,#1e7de0);
    color: #08111d;
    padding: 12px 18px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
}

.note-box {
    max-width: 1100px;
    margin: 0 auto 60px;
    padding: 0 20px;
}

.note-box-inner {
    background: rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 22px;
    color: #d8e8ff;
    line-height: 1.6;
    text-align: center;
}

.footer {
    text-align: center;
    padding: 24px 20px 30px;
    color: rgba(255,255,255,0.65);
    font-size: 13px;
}
</style>
</head>

<body>

<div class="navbar">
    <div class="logo">Johnson Strategic Solutions</div>
    <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="pricing.html">Pricing</a>
        <a href="intake.html">Start Here</a>
        <a href="login.html">Client Login</a>
    </div>
</div>

<div class="hero">
    <h1>Client Portal</h1>
    <p>
        This portal is the central access point for active clients. As the platform expands,
        this is where clients will view progress, documents, services, and account activity.
    </p>
</div>

<div class="portal-grid">

    <div class="card">
        <h3>Client Dashboard</h3>
        <p>View account overview, progress updates, service status, and next steps.</p>
        <a href="dashboard.html" class="button">Open Dashboard</a>
    </div>

    <div class="card">
        <h3>Submit Intake</h3>
        <p>Complete or update intake information so services can move forward properly.</p>
        <a href="intake.html" class="button">Open Intake</a>
    </div>

    <div class="card">
        <h3>Pricing & Services</h3>
        <p>Review service options, package levels, and strategic service paths.</p>
        <a href="pricing.html" class="button">View Pricing</a>
    </div>

    <div class="card">
        <h3>Secure Login</h3>
        <p>Access for active clients and future administrative portal expansion.</p>
        <a href="login.html" class="button">Go to Login</a>
    </div>

</div>

<div class="note-box">
    <div class="note-box-inner">
        This portal is currently the front-end structure of the Johnson Strategic Solutions platform.
        Secure authentication, protected accounts, file management, and client-specific tools can be added next.
    </div>
</div>

<div class="footer">
    © Johnson Strategic Solutions
</div>

</body>
</html>

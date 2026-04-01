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
    font-size: 24px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.nav-links a {
    color: #7fb8ff;
    text-decoration: none;
    font-weight: bold;
}

.container {
    max-width: 1200px;
    margin: 50px auto 80px;
    padding: 0 20px;
}

.hero {
    background: rgba(12,18,30,0.9);
    border: 1px solid rgba(77,166,255,0.12);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.45);
    margin-bottom: 24px;
}

.hero h1 {
    margin: 0 0 10px;
    font-size: 36px;
}

.hero p {
    margin: 0;
    color: #d7e6ff;
    line-height: 1.6;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
}

.card {
    background: rgba(12,18,30,0.92);
    border: 1px solid rgba(77,166,255,0.12);
    border-radius: 14px;
    padding: 26px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.45);
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
        <a href="dashboard.html">Dashboard</a>
        <a href="client-portal.html">Client Portal</a>
        <a href="intake.html">Intake</a>
        <a href="pricing.html">Pricing</a>
        <a href="admin.html">Admin</a>
        <a href="index.html">Logout</a>
    </div>
</div>

<div class="container">

    <div class="hero">
        <h1>Client Portal</h1>
        <p>
            This portal is where clients access services, documents, invoices, and account updates.
            Use the sections below to navigate through your services and next steps.
        </p>
    </div>

    <div class="grid">

        <div class="card">
            <h3>My Services</h3>
            <p>View your active services and current service paths.</p>
            <a href="dashboard.html" class="button">View Services</a>
        </div>

        <div class="card">
            <h3>Upload Documents</h3>
            <p>Upload documents, credit reports, business documents, and required files.</p>
            <a href="#" class="button">Upload Files</a>
        </div>

        <div class="card">
            <h3>Invoices</h3>
            <p>View invoices, payment history, and outstanding balances.</p>
            <a href="#" class="button">View Invoices</a>
        </div>

        <div class="card">
            <h3>Account Updates</h3>
            <p>See updates related to your services, tasks, and progress.</p>
            <a href="#" class="button">View Updates</a>
        </div>

        <div class="card">
            <h3>Submit New Intake</h3>
            <p>Submit a new intake form for additional services.</p>
            <a href="intake.html" class="button">New Intake</a>
        </div>

        <div class="card">
            <h3>Contact / Support</h3>
            <p>Submit a support request or ask questions about your services.</p>
            <a href="intake.html" class="button">Contact</a>
        </div>

    </div>

</div>

<div class="footer">
    © Johnson Strategic Solutions | Client Portal
</div>

</body>
</html>

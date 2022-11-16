class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <!-- Start component -->
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" style="padding-right: 2rem">
                    <img class="bi me-2" width="40" height="32" role="img" src="../assets/brand/gaadigo-logo-white.png" />
                    <h2> GaadiGo </h2>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" class="nav-link px-2 text-white">Home</a></li>
                    <li><a href="addcar.html" class="nav-link px-2 text-white">Register your Car</a></li>
                    <li><a href="findcar.html" class="nav-link px-2 text-white">Find a Car</a></li>
                    <li><a href="faq.html" class="nav-link px-2 text-white">FAQs</a></li>
                </ul>

                <div class="text-end">
                    <span id="login-button">
                        <button type="button" class="btn btn-outline-light me-2" data-bs-toggle="modal"
                            data-bs-target="#signinModal">Login</button>
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#signupModal">Sign Up</button>
                    </span>
                    <span id="logout-section" hidden>
                        <span id="logged-in-user" style="padding-right: 10px;"></span>
                        <button id="logout-button" type="button" class="btn btn-warning">Log Out</button>
                    </span>
                </div>
            </div>
        </div>
    </header>


    <!-- Start Signin Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="signinModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <h1 class="fw-bold mb-0 fs-2">Sign In</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form id="loginForm" class="">
                        <div class="form-floating mb-3">
                            <input id="login_email" type="email" class="form-control rounded-3" id="floatingInput"
                                placeholder="name@example.com">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input id="login_password" type="password" class="form-control rounded-3"
                                id="floatingPassword" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit"
                            data-bs-dismiss="modal">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End Signin Modal -->
    <!-- Start Signup Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="signupModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <h1 class="fw-bold mb-0 fs-2">Sign In</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form id="createAccountForm" class="">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3" id="signupName" placeholder="John Doe">
                            <label for="signupName">Full Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control rounded-3" id="signupAge" placeholder="Password"
                                min="18">
                            <label for="signupAge">Age</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="tel" class="form-control rounded-3" id="signupPhone"
                                placeholder="10 digit mobile number">
                            <label for="signupPhone">Phone Number</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control rounded-3" id="signupEmail"
                                placeholder="name@example.com">
                            <label for="signupEmail">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="signupPassword"
                                placeholder="Password">
                            <label for="signupPassword">Password</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="verifySignupPassword"
                                placeholder="Confirm Password">
                            <label for="verifySignupPassword">Confirm Password</label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" data-bs-dismiss="modal"
                            type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End Signup Modal -->
    <!-- Start Sign In error modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="loginErrorModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <!-- <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1> -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 pt-0">
                    <h2 class="fs-5 fw-bold">Authentication Error</h2>
                    <hr class="my-4">
                    <small class="text-muted">You entered an invalid email or password. Please try again.</small>
                </div>
            </div>
        </div>
    </div>
    <!-- End Sign In error modal -->
    <!-- Start Sign up error modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="signupErrorModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <!-- <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1> -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 pt-0">
                    <h2 class="fs-5 fw-bold">Email already exists</h2>
                    <hr class="my-4">
                    <small class="text-muted">The email you used already exists. Please contact the administrator to
                        reset your password.</small>
                </div>
            </div>
        </div>
    </div>
    <!-- End Sign up error modal -->
    <!-- Start Sign up success modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="signupSuccessModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <!-- <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1> -->
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 pt-0">
                    <h2 class="fs-5 fw-bold">Sign Up Successful</h2>
                    <hr class="my-4">
                    <small class="text-muted">You've successfully created an account! Please log in to continue.</small>
                </div>
            </div>
        </div>
    </div>
    <!-- End Sign up success modal -->

         `;
  }
}

customElements.define("header-component", Header);

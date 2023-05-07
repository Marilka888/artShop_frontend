<template>
  <div>
    <main>
      <div class="py-5 text-center">
        <h2>Добрый день, {{ profile.name }}</h2>
      </div>

      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Ваши заказы</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Product name</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Second product</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$8</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Third item</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success">−$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>

          <form class="card p-2">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Promo code">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </form>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Ваши данные</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <!--                <input type="text" class="form-control" id="firstName" placeholder="" value="{{ profile.name }}" required>-->
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" value=""
                       required>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input type="text" class="form-control" id="username" placeholder="Username"
                         required>
                  <div class="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">Email <span
                  class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com">
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                       required>
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="col-12">
                <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
                <input type="text" class="form-control" id="address2"
                       placeholder="Apartment or suite">
              </div>

              <div class="col-md-5">
                <label for="country" class="form-label">Country</label>
                <select class="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div class="col-md-4">
                <label for="state" class="form-label">State</label>
                <select class="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder="" required>
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>

            <hr class="my-4">

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address">
              <label class="form-check-label" for="same-address">Shipping address is the same as my
                billing address</label>
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="save-info">
              <label class="form-check-label" for="save-info">Save this information for next
                time</label>
            </div>

            <hr class="my-4">

            <h4 class="mb-3">Payment</h4>

            <div class="my-3">
              <div class="form-check">
                <input id="credit" name="paymentMethod" type="radio" class="form-check-input"
                       checked required>
                <label class="form-check-label" for="credit">Credit card</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input"
                       required>
                <label class="form-check-label" for="debit">Debit card</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="paymentMethod" type="radio" class="form-check-input"
                       required>
                <label class="form-check-label" for="paypal">PayPal</label>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>

            <hr class="my-4">

            <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  data() {
    return {
      profile: [],
    };
  },
  methods: {
    getProfile() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/profile`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          vm.favour = response.data.favour;
          vm.favorites.forEach((item) => {
            if (vm.favour.id === item.id) {
              vm.isFavorite = true;
            }
          });
          vm.$store.dispatch('updateLoading', false);
        });
    },
    categoryBtn(categoryTitle) {
      const vm = this;
      vm.$router.push({
        path: '/favourslist',
        query: { category: categoryTitle },
      });
    },
  },
  watch: {
    $route() {
      this.getProfile();
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';

//category
.category {
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    transition: all 0.15s ease;
    cursor: pointer;
    text-align: center;
    color: $secondary-color;
    white-space: nowrap;

    &:hover, &:active {
      background-color: $hot-color;
      color: $primary-color;
    }
  }

  > li:not(:last-child) {
    border-right: $hot-color solid 1px;
    @media(max-width: 992px) {
      border: none;
    }
  }
}

.cart-img-1 {
  background: url('../../assets/image/profile.png') bottom center no-repeat;
  background-size: cover;
}

.cart-img-2 {
  background: url('../../assets/image/cart-2.png') bottom center no-repeat;
  background-size: cover;
}

// discount
.discount {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  @media (max-width: 569px) {
    flex-direction: column;
    text-align: center;
    > div {
      margin-bottom: 1rem;
    }
  }

  .btn {
    width: 20%;
    @media (max-width: 569px) {
      width: 100%;
    }
  }
}

//cart
.cart {
  text-align: center;

  h3 {
    font-family: $font-family-title;
  }

  p {
    font-family: $font-family-text;
  }
}

.cart-img {
  padding: 10rem 0;
  color: $white-color;
  text-shadow: 1px 1px 1px $primary-color;
  @media (max-width: 414px) {
    padding: 5rem 0;
  }
}

.cart-content {
  padding: 2rem;
  background-color: $hot-color;
}

.cart-border {
  padding: 2.5rem 0;
  border: 2.5px $white-color solid;
}

@media (max-width: 767px) {
  .cart-reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>

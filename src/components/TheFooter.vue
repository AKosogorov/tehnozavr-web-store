<template>
  <footer class="footer">
    <div class="footer__wrapper container">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#"> Каталог </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com">
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Распродажа </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#">
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <VSocialLinkItem
          v-for="name of socialList"
          :key="name"
          :social-name="name"
        />
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются
        в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе
        об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright"> © 2022 Технозавррр </span>
    </div>
  </footer>
</template>

<script>
import VSocialLinkItem from "@/components/base/VSocialLinkItem";

import { SOCIAL_NAME_LIST } from "@/data/social";

export default {
  components: {
    VSocialLinkItem
  },
  data: () => ({
    socialList: [...SOCIAL_NAME_LIST]
  })
};
</script>

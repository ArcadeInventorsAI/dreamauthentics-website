// Legacy 301 redirects — preserve 20 years of SEO equity from the old DreamAuthentics site.
// Runs on every request BEFORE static assets are served. It only ever redirects paths that are
// explicitly listed here as OLD urls; every new/current route falls through to next() untouched.
// This replaces public/_redirects because Cloudflare Pages caps that file at ~100 rules and we
// have ~190 legacy mappings (two url eras: static .html/.htm + WordPress permalinks).

// Exact matches — keyed by pathname with any trailing slash stripped.
const EXACT = {
  // home / menu / old sitemap
  "/index.html": "/", "/index_mainmenu.html": "/", "/index-m.htm": "/", "/index-y.htm": "/",
  "/sitemap.html": "/", "/cool_toys.html": "/", "/cfest.html": "/", "/demopage3.html": "/",
  "/home": "/",
  // high-value PDFs still ranking in Search Console (redirect to the closest live page)
  "/support/4playerarcadegames.pdf": "/game-list/",
  "/wp-content/uploads/2016/05/DreamAuthenticsArtGuide.pdf": "/portfolio/",
  // about / company
  "/about.html": "/about/", "/about_us.html": "/about/", "/index_about.html": "/about/",
  "/tour.htm": "/about/", "/faq.html": "/about/", "/index_FAQ.htm": "/about/",
  "/services.html": "/about/", "/solutions.html": "/about/", "/terms.html": "/about/",
  "/finance.html": "/about/", "/index_tech.html": "/about/",
  // contact / quote / commerce (store removed → drive to quote)
  "/contact.html": "/contact/", "/index_contactus.html": "/contact/", "/email.html": "/contact/",
  "/shop.html": "/contact/", "/order.html": "/contact/", "/index_order.html": "/contact/",
  "/shipping_faq.html": "/contact/", "/shipping_rates.html": "/contact/",
  "/onsite_service.html": "/contact/", "/affiliate_program.html": "/contact/",
  // testimonials
  "/testimonials.html": "/testimonials/", "/index_testimonials.htm": "/testimonials/",
  // press / media
  "/news.html": "/press/", "/news_media.html": "/press/", "/maniatv.htm": "/press/",
  "/event_playboy.html": "/press/", "/videogameslive.html": "/press/", "/video_games_live.html": "/press/",
  // controls & parts
  "/controlpanels.html": "/controls/", "/controlpaneloverlay.html": "/controls/",
  "/fight_stick.html": "/controls/", "/index_steeljoysticks.htm": "/controls/",
  "/stainless_steel_competition_joysticks.html": "/controls/",
  "/light_gun.html": "/controls/", "/lightgun.html": "/controls/", "/index_lightgun.htm": "/controls/",
  "/index_flightsticks.htm": "/controls/", "/index_steeringwheel.htm": "/controls/",
  "/index_2_player.htm": "/controls/classic/", "/index_4_player.htm": "/controls/quad/",
  "/cupholders.htm": "/controls/", "/cup_holders.html": "/controls/", "/index_cupholders.htm": "/controls/",
  "/popup_spinner_options.html": "/controls/tornado-spinner/", "/popup_joystick_options.html": "/controls/",
  "/illuminatedballtops.html": "/controls/illuminated-joysticks/",
  // mame / monitor
  "/mame-arcade.html": "/arcades/mame-emulators/", "/monitor.html": "/arcades/mame-emulators/",
  "/game_engine.html": "/arcades/mame-emulators/", "/index_27monitor.htm": "/arcades/mame-emulators/",
  "/arcade_monitor.html": "/arcades/mame-emulators/", "/arcade_monitor_faq.html": "/arcades/mame-emulators/",
  // generic cabinets / products
  "/arcade-cabinet.html": "/arcades/", "/arcade-games.html": "/arcades/", "/arcade-game.html": "/arcades/",
  "/cabinet.html": "/arcades/", "/cabinetonly.html": "/arcades/", "/getcabinetonly.html": "/arcades/",
  "/products.html": "/arcades/", "/index_products.html": "/arcades/", "/product_i.html": "/arcades/",
  "/index_mega.htm": "/arcades/", "/index_mega.html": "/arcades/",
  // per-cabinet static pages (specific)
  "/dimension_excalibur.html": "/arcades/excalibur/", "/excalibur_dimensions.html": "/arcades/excalibur/",
  "/getexcalibur.html": "/arcades/excalibur/", "/index_excalibur.htm": "/arcades/excalibur/",
  "/dimension_eladius.html": "/arcades/eladius/", "/eladius_dimensions.html": "/arcades/eladius/",
  "/dimension_katana.html": "/arcades/katana/", "/katana_dimensions.html": "/arcades/katana/",
  "/dimension_sting.html": "/arcades/sting/", "/sting_dimensions.html": "/arcades/sting/",
  "/getultra.html": "/arcades/ultra-quad/", "/index_ultraquad.htm": "/arcades/ultra-quad/",
  "/index_ultraclassic.htm": "/arcades/ultra-quad/", "/index_ultraco2.htm": "/arcades/ultra-quad/",
  "/product_page_kiocade.html": "/arcades/kiocade/",
  // artwork / galleries (specific)
  "/art.html": "/portfolio/", "/sideart.html": "/gallery/",
  // game list + categories/platforms
  "/game_list.html": "/game-list/", "/gamelist.txt": "/game-list/", "/gamelisting.htm": "/game-list/",
  "/game-list": "/game-list/", "/game-faq": "/game-list/", "/licensed_games.htm": "/game-list/",
  "/light_gun_games.html": "/game-list/", "/free-online-games.htm": "/game-list/",
  "/play-arcade-games.htm": "/game-list/", "/games-play.htm": "/game-list/", "/computer.html": "/game-list/",
  "/action.htm": "/game-list/", "/action-adventure.htm": "/game-list/", "/adventure.htm": "/game-list/",
  "/board-games.htm": "/game-list/", "/cards.htm": "/game-list/", "/dice.htm": "/game-list/",
  "/driving-and-racing.htm": "/game-list/", "/racing.html": "/game-list/", "/educational.htm": "/game-list/",
  "/fighting.htm": "/game-list/", "/interactive-fiction.htm": "/game-list/", "/music-and-dance.htm": "/game-list/",
  "/outdoors.htm": "/game-list/", "/pinball.htm": "/game-list/", "/platform.htm": "/game-list/",
  "/puzzle.htm": "/game-list/", "/recreation.htm": "/game-list/", "/role-playing.htm": "/game-list/",
  "/shooter.htm": "/game-list/", "/simulation.htm": "/game-list/", "/sports.htm": "/game-list/",
  "/strategy.htm": "/game-list/", "/survival-horror.htm": "/game-list/", "/tile-games.htm": "/game-list/",
  "/trivia.htm": "/game-list/", "/word-games.htm": "/game-list/", "/windows.htm": "/game-list/",
  "/computer-platforms.htm": "/game-list/", "/console-platforms.htm": "/game-list/",
  "/arcade-platforms.htm": "/game-list/", "/browser-based.htm": "/game-list/", "/handheld-plat.htm": "/game-list/",
  "/chrono-trigger.htm": "/game-list/", "/guitarhero.html": "/game-list/",
  // articles / blog
  "/humor.htm": "/blog/", "/top_ten.html": "/blog/", "/play-games-article-directory.htm": "/blog/",
  "/play-game-resources.htm": "/blog/", "/play-games-review.htm": "/blog/",
  // bare section entry points
  "/arcades": "/arcades/", "/controls": "/controls/", "/about-us": "/about/", "/contact-us": "/contact/",
};

// Prefix matches — checked in order, most specific first. Each `from` is chosen so it can NEVER be
// the start of a current/new route (new routes live under /arcades/<cab>/, /controls/<x>/, /about/,
// /gallery/, /portfolio/ (single page), etc.), so startsWith() is safe.
const PREFIX = [
  ["/arcades/custom/excalibur-cabinet/arcade-parts/illuminated-joysticks", "/controls/illuminated-joysticks/"],
  ["/arcades/custom/excalibur-cabinet/tornado-spinner", "/controls/tornado-spinner/"],
  ["/arcades/custom/excalibur-cabinet/co2", "/controls/co2/"],
  ["/arcades/custom/excalibur-cabinet/quad", "/controls/quad/"],
  ["/arcades/custom/excalibur-cabinet/classic", "/controls/classic/"],
  ["/arcades/custom/excalibur-cabinet/solitaire", "/controls/solitaire/"],
  ["/arcades/custom/excalibur-cabinet/arcade-monitor", "/arcades/mame-emulators/"],
  ["/arcades/custom/excalibur-cabinet/game-engine", "/game-list/"],
  ["/arcades/custom/excalibur-cabinet/game-artwork", "/portfolio/"],
  ["/arcades/custom/excalibur-cabinet/arcade-parts", "/controls/"],
  ["/arcades/custom/excalibur-cabinet", "/arcades/excalibur/"],
  ["/arcades/custom/eladius-cabinet", "/arcades/eladius/"],
  ["/arcades/custom/sting-cabinet", "/arcades/sting/"],
  ["/arcades/custom/ultra-quad-cabinet", "/arcades/ultra-quad/"],
  ["/arcades/custom/katana-cabinet", "/arcades/katana/"],
  ["/arcades/custom/kiocade", "/arcades/kiocade/"],
  ["/arcades/custom/gaming-pedestal", "/arcades/gaming-pedestal/"],
  ["/arcades/custom/trade-my-arcade", "/trade-my-arcade/"],
  ["/arcades/custom", "/arcades/"],
  ["/arcade-game-rentals", "/arcades/"],
  // WooCommerce store (removed) — product-category rules BEFORE generic /product & /shop
  ["/product-category/control-panels", "/controls/"],
  ["/product-category/katana", "/arcades/katana/"],
  ["/product-category/excalibur", "/arcades/excalibur/"],
  ["/product-category/eladius", "/arcades/eladius/"],
  ["/product-category/sting", "/arcades/sting/"],
  ["/product-category/ultra-quad", "/arcades/ultra-quad/"],
  ["/product-category/kiocade", "/arcades/kiocade/"],
  ["/product-category", "/arcades/"],
  ["/product/", "/arcades/"],
  ["/shop", "/arcades/"],
  ["/cart", "/contact/"],
  ["/checkout", "/contact/"],
  ["/my-account", "/contact/"],
  ["/images/press", "/press/"],
  ["/support", "/about/"],
  ["/about-us/customer-gallery", "/gallery/"],
  ["/excalibur", "/arcades/excalibur/"],
  ["/ex_gallery", "/arcades/excalibur/"],
  ["/eladius", "/arcades/eladius/"],
  ["/el_gallery", "/arcades/eladius/"],
  ["/katana", "/arcades/katana/"],
  ["/ka_gallery", "/arcades/katana/"],
  ["/sting", "/arcades/sting/"],
  ["/st_gallery", "/arcades/sting/"],
  ["/ultra", "/arcades/ultra-quad/"],
  ["/uq_gallery", "/arcades/ultra-quad/"],
  ["/kiocade", "/arcades/kiocade/"],
  ["/mame-video-game-emulators", "/arcades/mame-emulators/"],
  ["/controlpanel", "/controls/"],
  ["/flashdesigner", "/controls/"],
  ["/additional-tops", "/controls/"],
  ["/cpanel_gallery", "/gallery/"],
  ["/arcade_control_panel_gallery", "/gallery/"],
  ["/custom_control_panel_gallery", "/gallery/"],
  ["/flame_control_panel_gallery", "/gallery/"],
  ["/lightning_control_panel_gallery", "/gallery/"],
  ["/neon_control_panel_gallery", "/gallery/"],
  ["/sideart_gallery", "/gallery/"],
  ["/marquees", "/gallery/"],
  ["/customer-gallery", "/gallery/"],
  ["/portfolio-filter", "/portfolio/"],
  ["/portfolio/", "/portfolio/"],
  ["/newsletter", "/press/"],
  ["/product_page", "/arcades/"],
  ["/product_pa", "/arcades/"],
  ["/8-things-you-didnt-know-about-pac-man", "/blog/"],
  ["/article-", "/blog/"],
  ["/artilce-", "/blog/"],
  ["/about-us", "/about/"],
  ["/contact-us", "/contact/"],
];

const stripSlash = (s) => (s.length > 1 ? s.replace(/\/+$/, "") : s);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Legacy blog subdomain: blog.dreamauthentics.com/blog/<cat>/0/0/<slug> -> apex /blog/<slug>/.
  if (url.hostname.startsWith("blog.")) {
    const m = url.pathname.match(/\/0\/0\/([a-z0-9-]+)\/?$/i);
    return Response.redirect("https://dreamauthentics.com/blog/" + (m ? m[1] + "/" : ""), 301);
  }

  // Canonical host: 301 www.* -> apex so Google consolidates to one hostname.
  if (url.hostname.startsWith("www.")) {
    return Response.redirect("https://" + url.hostname.slice(4) + url.pathname + url.search, 301);
  }

  const path = url.pathname;

  // Never touch API routes or static asset dirs.
  if (path.startsWith("/api/") || path.startsWith("/_astro/") ||
      path.startsWith("/img/") || path.startsWith("/assets/") || path.startsWith("/fonts/")) {
    return next();
  }

  const norm = stripSlash(path);

  // Exact match (skip if it would redirect a page to itself).
  const exact = EXACT[norm];
  if (exact && norm !== stripSlash(exact)) {
    return Response.redirect(url.origin + exact, 301);
  }

  // Prefix match (ordered, most specific first).
  for (const [from, to] of PREFIX) {
    if (norm === from || norm.startsWith(from)) {
      if (norm !== stripSlash(to)) {
        return Response.redirect(url.origin + to, 301);
      }
    }
  }

  return next();
}

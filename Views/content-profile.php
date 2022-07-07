<?php
extract($profile_options);
?>
<!-- Profile Template -->
<div class="profiles-plugin profiles-container">
    <div id="publication-container"></div>
    <?php if ($show_filter): ?> 
        <div class="filter-container">
            <select class='filter-selector'>
                <option value="">--Filter by--</option>
            </select>
        </div>
    <?php endif; ?>
    <div class="profiles-plugin profile" data-person="<?= $person ?>" data-api-url="<?= $api ?>"  data-publications-only="<?= $publications_only ?>" data-publication-limit="<?= $publication_limit ?>" data-allowed-tags="<?= $allowed_tags ?>" style="display:none;">
        <?php if ($show_image): ?>
            <div class="profile-image"></div>
        <?php endif; ?>
        <div class="info">
            <?php if ($show_name): ?>
                <h3 class="profile-name"><a class="profile-url"></a></h3>
            <?php endif; ?>
            <ul class="contact-info">
                <li class="item-template">
                    <?php if ($show_title): ?>
                        <strong class="primary_title"><span data-item-text="title"></span></strong><br>
                    <?php endif; ?>
                    <?php if ($show_secondary_title): ?>
                        <div class="secondary_title"><strong data-item-text="secondary_title"></strong></div>
                    <?php endif; ?>
                    <?php if ($show_tertiary_title): ?>
                        <div class="tertiary_title"><strong data-item-text="tertiary_title"></strong></div>
                    <?php endif; ?>
                    <?php if ($show_mailto): ?>
                        <a data-item-text="email" data-item-url-prefix="mailto:" data-item-url="email"></a>
                    <?php else: ?>
                        <span data-item-text="email"></span>
                    <?php endif; ?>
                    <?php if ($show_location): ?>
                        <span class="profile-location" data-item-text="location"></span>
                    <?php endif; ?>
                    <?php if ($show_phone): ?>
                        <span class="profile-phone" data-item-text="phone"></span>
                    <?php endif; ?>
                    <?php if ($show_url): ?>
                        <a class="profile-link primary" data-item-text="url_name" data-item-url="url"></a>
                    <?php endif; ?>
                    <?php if ($show_secondary_url): ?>
                        <a class="profile-link secondary" data-item-text="secondary_url_name" data-item-url="secondary_url"></a>
                    <?php endif; ?>
                    <?php if ($show_tertiary_url): ?>
                        <a class="profile-link tertiary" data-item-text="tertiary_url_name" data-item-url="tertiary_url"></a>
                    <?php endif; ?>
                    <?php if ($show_quaternary_url): ?>
                        <a class="profile-link quaternary" data-item-text="quaternary_url_name" data-item-url="quaternary_url"></a>
                    <?php endif; ?>
                    <?php if ($show_quinary_url): ?>
                        <a class="profile-link quinary" data-item-text="quinary_url_name" data-item-url="quinary_url"></a>
                    <?php endif; ?>
                    <?php if ($show_summary): ?>
                        <div class="profile-summary" data-item-text="profile_summary"></div>
                    <?php endif; ?>
                </li>
            </ul>
            <?php if ($show_tags): ?>
                <div class="profile-tags"></div>
            <?php endif; ?>
            <?php if ($show_preparation): ?>
            <ul class="profile-preparations">
                <li class="item-template">
                    <span data-item-text="degree"></span> - <span data-item-text="major"></span> - <span data-item-text="institution"></span> [<span data-item-text="year"></span>]
                </li>
            </ul>
            <?php endif; ?>
            <?php if ($show_awards): ?>
            <ul class="profile-awards">
                <li class="item-template">
                    <span data-item-text="name"></span> - <span data-item-text="organization"></span>
                </li>
            </ul>
            <?php endif; ?>
            <?php if ($show_appointments): ?>
            <div class="section-container">
              <h4>Appointments</h4>
              <ul class="profile-appointments">
                  <li class="item-template">
                      <span data-item-text="appointment"></span> - <span data-item-text="organization"></span> [<span data-item-text="start_date"></span> - <span data-item-text="end_date"></span>]
                  </li>
              </ul>
            </div>
            <?php endif; ?>
            <?php if ($show_support): ?>
            <div class="section-container">
              <h4>Support</h4>
              <ul class="profile-support">
                  <li class="item-template">
                      <span data-item-text="title"></span> <strong>$<span data-item-text="amount"></span></strong> - <i><span data-item-text="sponsor"></span></i> (<span data-item-text="start_date"></span> - <span data-item-text="end_date"></span>)
                  </li>
              </ul>
            </div>
            <?php endif; ?>

            <?php if ($show_publications): ?>
            <div class="section-container">
              <h4>Publications</h4>
              <ul class="profile-publications">
                  <li class="item-template">
                      <span data-item-text="title"></span> [<span data-item-text="year"></span>]
                  </li>
              </ul>
            </div>
            <?php endif; ?>
      </div>
    </div>
</div>
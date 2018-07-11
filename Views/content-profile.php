<?php
extract($profile_options);
?>
<!-- Profile Template -->
<div class="profiles-plugin container">
    <div id="publication-container"></div>
    <div class="profiles-plugin profile" data-person="<?= $person ?>" data-api-url="<?= $api ?>"  data-publications-only="<?= $publications_only ?>" data-publication-limit="<?= $publication_limit ?>" style="display:none;">
        <?php if ($show_image): ?>
            <div class="profile-image"></div>
        <?php endif; ?>
        <div class="info">
            <?php if ($show_name): ?>
                <h3 class="profile-name"><a class="profile-url"></a></h3>
            <?php endif; ?>
            <ul class="contact-info">
                <li class="item-template">
                    <strong><span data-item-text="title"></span></strong><br>
                    <span data-item-text="email"></span> | <span data-item-text="location"></span> | <span data-item-text="phone"></span>
                </li>
            </ul>
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

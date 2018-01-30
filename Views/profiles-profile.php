<!-- Profile Template -->
<div id="<?= $person ?>_profile">
    <a class="profile-url">
        <h3 class="profile-name"></h3>
    </a>
    <div class="profile-image"></div>

    <h4>Support</h4>
    <div class="profile-support" data-item-text="title">
        <span class="template">
            <strong>$<span data-item-text="amount"></span></strong> - <i><span data-item-text="sponsor"></span></i> (<span data-item-text="start_date"></span> - <span data-item-text="end_date"></span>)
        </span>
    </div>

    <h4>Publications</h4>
    <div class="profile-publications" data-item-text="name"></div>
</div>
<!-- Profile Template -->
<div id="<?= $person ?>_profile">
    <a class="profile-url">
        <h3 class="profile-name"></h3>
    </a>
    <div class="profile-image"></div>

    <h4>Awards</h4>
    <ul class="profile-awards">
        <li class="item-template">
            <span data-item-text="name"></span> - <span data-item-text="organization"></span>
        </li>
    </ul>

    <h4>Support</h4>
    <ul class="profile-support">
        <li class="item-template">
            <span data-item-text="title"></span> <strong>$<span data-item-text="amount"></span></strong> - <i><span data-item-text="sponsor"></span></i> (<span data-item-text="start_date"></span> - <span data-item-text="end_date"></span>)
        </li>
    </ul>

    <h4>Publications</h4>
    <ul class="profile-publications">
        <li class="item-template">
            <span data-item-text="name"></span>
        </li>
    </ul>
</div>